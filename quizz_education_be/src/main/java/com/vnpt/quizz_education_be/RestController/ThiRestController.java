package com.vnpt.quizz_education_be.RestController;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.vnpt.quizz_education_be.DAO.BoCauHoiDaLamDAO;
import com.vnpt.quizz_education_be.DAO.DeThiDAO;
import com.vnpt.quizz_education_be.DAO.LichSuThiDAO;
import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.DTO.ThiDTO;
import com.vnpt.quizz_education_be.DTO.ThiResponeDTO;
import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;
import com.vnpt.quizz_education_be.Entity.CauHoi;
import com.vnpt.quizz_education_be.Entity.DapAn;
import com.vnpt.quizz_education_be.Entity.DeThi;
import com.vnpt.quizz_education_be.Entity.LichSuThi;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class ThiRestController {

    @Autowired
    BoCauHoiDaLamDAO boCauHoiDaLamDAO;

    @Autowired
    DeThiDAO deThiDAO;

    @Autowired
    TaiKhoanDAO taiKhoanDAO;

    @Autowired
    LichSuThiDAO lichSuThiDAO;

    private List<LichSuThi> lichSuThis;

    // ! API lấy đề thi cho học sinh
    @GetMapping("/boCauHoiDaLam/{tenDangNhap}/{maDeThi}")
    public ResponseEntity<?> post(@PathVariable("tenDangNhap") String tenDangNhap,
            @PathVariable("maDeThi") int maDeThi) {
        BoCauHoiDaLam boCauHoiDaLam = boCauHoiDaLamDAO.getBoCauHoiDaLam(tenDangNhap, maDeThi);
        DeThi deThi = deThiDAO.findById(maDeThi).get();
        TaiKhoan taiKhoan = taiKhoanDAO.findById(tenDangNhap).get();
        if (boCauHoiDaLam == null) {
            if (deThi == null) { // ! Đề thi không tồn tại
                return ResponseEntity.badRequest().body("Đề thi không tồn tại!");
            } else {
                BoCauHoiDaLam boCauHoiDaLamNew = new BoCauHoiDaLam();
                boCauHoiDaLamNew.setTaiKhoan(taiKhoan);
                boCauHoiDaLamNew.setDeThi(deThi);
                Date now = new Date();
                boCauHoiDaLamNew.setThoiGianBatDau(now);
                return ResponseEntity.ok(new ThiDTO(boCauHoiDaLamDAO.save(boCauHoiDaLamNew)));
            }
        } else {
            if (boCauHoiDaLam.getVaoThi() && boCauHoiDaLam.isDaNop() == false) {
                boCauHoiDaLam = getDeThiDaLam(boCauHoiDaLam);
                if (deThi == null) { // ! Đề thi không tồn tại
                    return ResponseEntity.badRequest().body("Đề thi không tồn tại!");
                } else {
                    return ResponseEntity.ok(new ThiDTO(boCauHoiDaLam));
                }
            } else {
                return ResponseEntity.badRequest().body("Bạn đã hết thời gian làm bài hoặc đã nộp bài!");
            }
        }

    }

    @PostMapping("/boCauHoiDaLam/nopBai")
    public ResponseEntity<?> nopBai(@RequestBody ThiResponeDTO thiResponeDTO) {
        BoCauHoiDaLam boCauHoiDaLam = boCauHoiDaLamDAO.findById(thiResponeDTO.getBoCauHoiDaLam().getMaBoCauHoiDaLam())
                .get();
        Date now = new Date();
        boolean daNop = thiResponeDTO.isDaNop();
        if (daNop) {
            boCauHoiDaLam.setDaNop(daNop);
        }
        boCauHoiDaLam.setThoiGianKetThuc(now);
        boCauHoiDaLamDAO.save(boCauHoiDaLam);
        return ResponseEntity.ok(null);
    }

    // ! API chọn đáp án của học sinh
    @PostMapping("/boCauHoiDaLam")
    public ResponseEntity<?> getDeThi(@RequestBody ThiResponeDTO thiResponeDTO) throws JsonProcessingException {
        BoCauHoiDaLam boCauHoiDaLam = boCauHoiDaLamDAO.findById(thiResponeDTO.getBoCauHoiDaLam().getMaBoCauHoiDaLam())
                .get();
        DapAn dapAn = thiResponeDTO.getDapAn();
        boolean cauHoiNhieuDapAn = thiResponeDTO.getCauHoi().getNhieuDapAn();
        List<LichSuThi> lichSuThis = null;
        try {
            lichSuThis = boCauHoiDaLam.getList_LichSuThi();
        } catch (Exception e) {
        }

        if (cauHoiNhieuDapAn) { // ! Xử lý câu hỏi nhiều đáp án
            boolean xoaDapAn = thiResponeDTO.isXoa();
            if (xoaDapAn) { // ! xóa đáp án của câu hỏi nhiều đáp án
                if (lichSuThis != null && !lichSuThis.isEmpty() && lichSuThis.size() > 0) {
                    for (int i = 0; i < lichSuThis.size(); i++) {
                        LichSuThi lichSuThi = lichSuThis.get(i);
                        DapAn dapAnXoa = thiResponeDTO.getDapAn();
                        if (lichSuThi.getDapAn().getMaDapAn() == dapAnXoa.getMaDapAn()) {
                            lichSuThiDAO.delete(lichSuThi);
                            lichSuThis.remove(i);
                            break;
                        }
                    }
                }
            } else { // ! Chọn đáp án mới của câu hỏi nhiều đáp án
                List<CauHoi> listCauHoi = boCauHoiDaLam.getDeThi().getCauHois();
                if (listCauHoi != null && !listCauHoi.isEmpty() && listCauHoi.size() > 0) {
                    for (int i = 0; i < listCauHoi.size(); i++) {
                        CauHoi cauHoi = listCauHoi.get(i);
                        Integer cauHoiTraLoi = thiResponeDTO.getCauHoi().getMaCauHoi();
                        if (cauHoiTraLoi == cauHoi.getMaCauHoi()) {
                            DapAn dapAnNew = new DapAn();
                            for (DapAn dapAnCauHoi : cauHoi.getDapAns()) {
                                if (dapAnCauHoi.getMaDapAn() == dapAn.getMaDapAn()) {
                                    dapAnNew = dapAnCauHoi;
                                    dapAnNew.setDaChon(true);
                                }
                                System.out.print("");
                            }
                            LichSuThi lichSuThi = new LichSuThi();
                            lichSuThi.setBoCauHoiDaLam(boCauHoiDaLam);
                            lichSuThi.setDapAn(dapAnNew);
                            lichSuThi = lichSuThiDAO.save(lichSuThi);
                            lichSuThis.add(lichSuThi);
                            break;
                        }
                    }
                }
            }

        } else { // !xử lý câu hỏi 1 đáp án
            boolean check = true; // ! kiểm tra xem đáp án vừa mới chọn có thuộc câu hỏi đã chọn đáp án chư
            if (lichSuThis != null && !lichSuThis.isEmpty() && lichSuThis.size() > 0) {
                for (int i = 0; i < lichSuThis.size(); i++) {
                    LichSuThi lichSuThi = lichSuThis.get(i);
                    Integer maCauHoi = lichSuThi.getDapAn().getCauHoi().getMaCauHoi();
                    CauHoi cauHoi = thiResponeDTO.getCauHoi();
                    if (cauHoi.getMaCauHoi() == maCauHoi) {
                        check = false;
                        CauHoi cauHoiDB = lichSuThi.getDapAn().getCauHoi();
                        for (DapAn dapAnCauHoi : cauHoiDB.getDapAns()) {
                            if (dapAnCauHoi.getMaDapAn() == dapAn.getMaDapAn()) {
                                dapAn = dapAnCauHoi;
                            }
                        }
                        dapAn.setCauHoi(cauHoiDB);
                        lichSuThi.setDapAn(dapAn);
                        lichSuThi = lichSuThiDAO.save(lichSuThi);
                        lichSuThis.set(i, lichSuThi);
                        break;
                    }
                }
                boCauHoiDaLam.setList_LichSuThi(lichSuThis);
            }

            if (check) {// ! Đáp án mới hoàn toàn
                List<CauHoi> listCauHoi = boCauHoiDaLam.getDeThi().getCauHois();
                if (listCauHoi != null && !listCauHoi.isEmpty() && listCauHoi.size() > 0) {
                    for (int i = 0; i < listCauHoi.size(); i++) {
                        CauHoi cauHoi = listCauHoi.get(i);
                        Integer cauHoiTraLoi = thiResponeDTO.getCauHoi().getMaCauHoi();
                        if (cauHoiTraLoi == cauHoi.getMaCauHoi()) {
                            for (DapAn dapAnCauHoi : cauHoi.getDapAns()) {
                                if (dapAnCauHoi.getMaDapAn() == dapAn.getMaDapAn()) {
                                    dapAn = dapAnCauHoi;
                                    dapAn.setDaChon(true);
                                }
                            }
                            LichSuThi lichSuThi = new LichSuThi();
                            lichSuThi.setBoCauHoiDaLam(boCauHoiDaLam);
                            lichSuThi.setDapAn(dapAn);
                            lichSuThi = lichSuThiDAO.save(lichSuThi);
                            lichSuThis.add(lichSuThi);
                            break;
                        }
                    }
                }
            }

        }
        boCauHoiDaLam.setList_LichSuThi(lichSuThis);
        List<CauHoi> cauHois = null;
        try {
            boCauHoiDaLam = getDeThiDaLam(boCauHoiDaLam);
            cauHois = boCauHoiDaLam.getDeThi().getCauHois();
        } catch (Exception e) {
        }

        Float tongDiem = 0f;
        for (CauHoi cauHoi : cauHois) {
            if (cauHoi.isDaChon()) {
                Float diemCauHoi = getDiemCauHoi(cauHoi);
                tongDiem += diemCauHoi;
                System.out.print("");
            }
        }
        Date date = new Date();
        boCauHoiDaLam.setThoiGianKetThuc(date);
        boCauHoiDaLam.setDiemSo(tongDiem);
        boCauHoiDaLamDAO.save(boCauHoiDaLam);
        return ResponseEntity.ok(null);
    }

    // ! Tính điểm của câu hỏi truyền vào
    private Float getDiemCauHoi(CauHoi cauHoi) {
        Float diem = 0f;
        if (cauHoi != null) {
            if (cauHoi.getNhieuDapAn()) { // ! Câu hỏi nhiều đáp án
                Float diemDapAn = 0f;
                Integer cauDung = 0;
                Integer cauSai = 0;
                for (DapAn dapAn : cauHoi.getDapAns()) {
                    if (diemDapAn == 0 && dapAn.getDapAnDung()) {
                        diemDapAn = dapAn.getDiemDapAn();
                    }
                    if (dapAn.isDaChon()) {
                        if (dapAn.getDapAnDung()) {
                            cauDung++;
                        } else {
                            cauSai++;
                        }
                    }
                }
                if (cauDung > cauSai) {
                    diem = (cauDung - cauSai) * diemDapAn;
                }
            } else { // ! Câu hỏi 1 đáp án
                for (DapAn dapAn : cauHoi.getDapAns()) {
                    if (dapAn.isDaChon()) {
                        if (dapAn.getDapAnDung()) {
                            diem = dapAn.getDiemDapAn();
                        }
                    }
                }
            }
        }
        return diem;
    }

    // ! sàn lọc và chọn vào những đáp án đúng của boCauHoiDaLam
    private BoCauHoiDaLam getDeThiDaLam(BoCauHoiDaLam boCauHoiDaLam) {
        try {
            List<LichSuThi> lichSuThis = boCauHoiDaLam.getList_LichSuThi();
            int i = 0;
            if (lichSuThis != null && !lichSuThis.isEmpty()) {
                for (LichSuThi lichSuThi : lichSuThis) {
                    // set đáp án đã chọn
                    i++;
                    DapAn dapAn = lichSuThi.getDapAn();
                    CauHoi cauHoi = dapAn.getCauHoi();
                    cauHoi.setDaChon(true);
                    dapAn.setCauHoi(cauHoi);
                    dapAn.setDaChon(true);
                    lichSuThi.setDapAn(dapAn);
                    System.out.print("");
                }
                boCauHoiDaLam.setList_LichSuThi(lichSuThis);
                return boCauHoiDaLam;
            }

        } catch (Exception e) {
            return boCauHoiDaLam;
        }
        return boCauHoiDaLam;
    }

}
