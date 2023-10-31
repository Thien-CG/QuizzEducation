package com.vnpt.quizz_education_be.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.BoCauHoiDaLamDAO;
import com.vnpt.quizz_education_be.DAO.DeThiDAO;
import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;
import com.vnpt.quizz_education_be.Entity.CauHoi;
import com.vnpt.quizz_education_be.Entity.DapAn;
import com.vnpt.quizz_education_be.Entity.DeThi;
import com.vnpt.quizz_education_be.Entity.LichSuThi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class ThiRestController {

    @Autowired
    BoCauHoiDaLamDAO boCauHoiDaLamDAO;

    @Autowired
    DeThiDAO deThiDAO;

    @GetMapping("/boCauHoiDaLam/{tenDangNhap}/{maDeThi}")
    public ResponseEntity<?> post(@PathVariable("tenDangNhap") String tenDangNhap,
            @PathVariable("maDeThi") int maDeThi) {
        BoCauHoiDaLam boCauHoiDaLam = boCauHoiDaLamDAO.getBoCauHoiDaLam(tenDangNhap, maDeThi);
        DeThi deThi = deThiDAO.getById(maDeThi);
        if (boCauHoiDaLam == null) {
            if (deThi == null) { // ! Đề thi không tồn tại
                return ResponseEntity.badRequest().body("Đề thi không tồn tại!");
            } else {
                List<CauHoi> list = deThi.getCauHois();
                return ResponseEntity.ok(list);
            }
        } else {
            List<CauHoi> list = getDeThiDaLam(boCauHoiDaLam);
            if (list == null || list.isEmpty()) {
                if (deThi == null) { // ! Đề thi không tồn tại
                    return ResponseEntity.badRequest().body("Đề thi không tồn tại!");
                } else {
                    List<CauHoi> listCauHoi = deThi.getCauHois();
                    return ResponseEntity.ok(listCauHoi);
                }
            } else {
                return ResponseEntity.ok(list);
            }
        }
    }

    private List<CauHoi> getDeThiDaLam(BoCauHoiDaLam boCauHoiDaLam) {
        List<LichSuThi> lichSuThis = boCauHoiDaLam.getList_LichSuThi();
        if (lichSuThis != null && !lichSuThis.isEmpty()) {
            for (LichSuThi lichSuThi : lichSuThis) {
                DapAn dapAn = lichSuThi.getDapAn();
                dapAn.setDaChon(true);
                lichSuThi.setDapAn(dapAn);
                System.out.println("hehe");
            }
            return lichSuThis.get(0).getDapAn().getCauHoi().getDeThi().getCauHois();
        }
        return null;
    }

}
