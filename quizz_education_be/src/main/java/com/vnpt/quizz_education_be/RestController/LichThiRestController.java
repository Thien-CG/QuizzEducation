package com.vnpt.quizz_education_be.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.ChiTietKiThiDAO;
import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.Entity.ChiTietKyThi;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api/lichThi")
public class LichThiRestController {

    @Autowired
    ChiTietKiThiDAO chiTietKiThiDAO;

    @Autowired
    TaiKhoanDAO taiKhoanDAO;

    @GetMapping("/{tenDangNhap}")
    public ResponseEntity<?> getAllLichThi(@PathVariable("tenDangNhap") String tenDangNhap) {
        TaiKhoan taiKhoan = new TaiKhoan();

        // Lỗi Tài khoản không tồn tại
        try {
            taiKhoan = taiKhoanDAO.findById(tenDangNhap).get();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Tên đăng nhập không tồn tại!");
        }

        // Không có vai trò là học sinh
        if (taiKhoan.getVaiTro().getMaVaiTro() != 1) {
            return ResponseEntity.badRequest().body("Không thể tham gia kì thi! Do bạn không phải sinh viên");
        }

        Integer maLopThi;
        // Lỗi sinh viên chưa được sắp lớp
        try {
            maLopThi = taiKhoan.getLopThi().getMaLopThi();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Sinh viên chưa được sắp lớp!");
        }

        List<ChiTietKyThi> list = chiTietKiThiDAO.getAll(taiKhoan.getLopThi().getMaLopThi());

        return ResponseEntity.ok(list);
    }
}
