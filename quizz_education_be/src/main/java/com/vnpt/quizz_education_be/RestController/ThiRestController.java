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
            // if (boCauHoiDaLam.getVaoThi()) {
            boCauHoiDaLam = getDeThiDaLam(boCauHoiDaLam);
            if (deThi == null) { // ! Đề thi không tồn tại
                return ResponseEntity.badRequest().body("Đề thi không tồn tại!");
            } else {
                return ResponseEntity.ok(new ThiDTO(boCauHoiDaLam));
            }
            // } else {
            // return ResponseEntity.badRequest().body("Bạn đã hết thời gian làm bài!");
            // }
        }

    }

    // ! API chọn đáp án của học sinh
    @PostMapping("/boCauHoiDaLam")
    public ResponseEntity<?> LoginMethod(@RequestBody ThiResponeDTO thiResponeDTO) throws JsonProcessingException {
        BoCauHoiDaLam boCauHoiDaLam = boCauHoiDaLamDAO.findById(thiResponeDTO.getBoCauHoiDaLam().getMaBoCauHoiDaLam())
                .get();
        DapAn dapAn = thiResponeDTO.getDapAn();
        boolean cauHoiNhieuDapAn = thiResponeDTO.getCauHoi().getNhieuDapAn();
        List<LichSuThi> lichSuThis = null;
        try {
            lichSuThis = boCauHoiDaLam.getList_LichSuThi();
        } catch (Exception e) {
        }

        if (cauHoiNhieuDapAn) {
            boolean xoaDapAn = thiResponeDTO.isXoa();

            // ! Xử lý câu hỏi nhiều đáp án
            if (xoaDapAn) {
                if (lichSuThis != null && !lichSuThis.isEmpty()) {
                    if (lichSuThis.size() > 0) {
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
                }
            } else {
                LichSuThi lichSuThi = new LichSuThi();
                lichSuThi.setBoCauHoiDaLam(boCauHoiDaLam);
                lichSuThi.setDapAn(dapAn);
                lichSuThi = lichSuThiDAO.save(lichSuThi);
                lichSuThis.add(lichSuThi);
            }

        } else { // !xử lý câu hỏi 1 đáp án

            boolean check = true; // kiểm tra xem đáp án vừa mới chọn có thuộc câu hỏi đã chọn đáp án chưa

            if (lichSuThis != null && !lichSuThis.isEmpty()) {
                // kiểm tra xem đáp án có tồn tại trong db hay chưa
                for (int i = 0; i < lichSuThis.size(); i++) {
                    LichSuThi lichSuThi = lichSuThis.get(i);
                    Integer maCauHoi = lichSuThi.getDapAn().getCauHoi().getMaCauHoi();
                    CauHoi cauHoi = thiResponeDTO.getCauHoi();
                    cauHoi.setDeThi(deThiDAO.findById(thiResponeDTO.getBoCauHoiDaLam().getDeThi().getMaDeThi()).get());
                    if (cauHoi.getMaCauHoi() == maCauHoi) {
                        check = false;
                        if (!lichSuThi.getDapAn().getCauHoi().getNhieuDapAn()) {
                            dapAn.setCauHoi(cauHoi);
                            lichSuThi.setDapAn(dapAn);
                            lichSuThi = lichSuThiDAO.save(lichSuThi);
                            lichSuThis.set(i, lichSuThi);
                        }
                        break;
                    }
                }

                boCauHoiDaLam.setList_LichSuThi(lichSuThis);
            }

            if (check) {
                LichSuThi lichSuThi = new LichSuThi();
                lichSuThi.setBoCauHoiDaLam(boCauHoiDaLam);
                lichSuThi.setDapAn(dapAn);
                lichSuThi = lichSuThiDAO.save(lichSuThi);
                lichSuThis.add(lichSuThi);
            }

        }
        boCauHoiDaLam.setList_LichSuThi(lichSuThis);
        Date now = new Date();
        boCauHoiDaLam.setThoiGianKetThuc(now);
        List<CauHoi> cauHois = null;
        try {
            // cauHois = getDeThiDaLam(boCauHoiDaLam).getDeThi().getCauHois();
            BoCauHoiDaLam boCauHoiDaLamNew = boCauHoiDaLamDAO
                    .findById(thiResponeDTO.getBoCauHoiDaLam().getMaBoCauHoiDaLam())
                    .get();
            boCauHoiDaLam = getDeThiDaLam(boCauHoiDaLamNew);
            cauHois = boCauHoiDaLam.getDeThi().getCauHois();

        } catch (Exception e) {
        }

        Float tongDiem = 0f;
        // for (CauHoi cauHoi : cauHois) {
        //     if (cauHoi.isDaChon()) {
        //         tongDiem += getDiemCauHoi(cauHoi);
        //     }
        // }
        for(LichSuThi lichSuThi : lichSuThis) {
            lichSuThi.getDapAn().getDiemDapAn();
        }
        boCauHoiDaLam.setDiemSo(tongDiem);
        boCauHoiDaLamDAO.save(boCauHoiDaLam);

        return ResponseEntity.ok(null);
    }

    private Float getDiemCauHoi(CauHoi cauHoi) {
        if (cauHoi != null) {
            if (cauHoi.getNhieuDapAn()) {
                Float diemDapAn = 0f;
                for (DapAn dapAn : cauHoi.getDapAns()) {
                    if (dapAn.isDaChon()) {
                        if (dapAn.getDapAnDung()) {
                            diemDapAn += dapAn.getDiemDapAn();
                        } else {
                            diemDapAn -= dapAn.getDiemDapAn();
                        }
                    }
                }
                if (diemDapAn > 0) {
                    return diemDapAn;
                } else {
                    return 0f;
                }
            } else {
                for (DapAn dapAn : cauHoi.getDapAns()) {
                    if (dapAn.isDaChon()) {
                        if (dapAn.getDapAnDung()) {
                            return dapAn.getDiemDapAn();
                        }
                    }
                }
            }
        }
        return 0f;
    }

    private Float a(LichSuThi lichSuThi) {

        return null;
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
                    System.out.println();
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
