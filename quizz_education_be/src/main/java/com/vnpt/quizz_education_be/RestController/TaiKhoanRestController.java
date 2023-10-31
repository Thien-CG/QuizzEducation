package com.vnpt.quizz_education_be.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.DAO.VaiTroDAO;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/quizzeducation/api")
public class TaiKhoanRestController {
    @Autowired
    TaiKhoanDAO taiKhoanDAO;

    @Autowired
    VaiTroDAO vaiTroDAO;

    // Get danh sách tất cả tài khoản
    @GetMapping("taikhoan")
    public ResponseEntity<List<TaiKhoan>> findAll() {
        return ResponseEntity.ok(taiKhoanDAO.findAll());
    }

    // Get danh sách tất cả tài khoản thuộc học sinh
    @GetMapping("taikhoan/hocsinh")
    public ResponseEntity<List<TaiKhoan>> findByHocSinh() {
        return ResponseEntity.ok(taiKhoanDAO.findByHocSinh());
    }
     @GetMapping("taikhoan/giaovien")
    public ResponseEntity<List<TaiKhoan>> findByGiaoVien() {
        return ResponseEntity.ok(taiKhoanDAO.findByGiaoVien());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("taikhoan/{id}")
    public ResponseEntity<TaiKhoan> findById(@PathVariable("id") String tenDangNhap) {
        Optional<TaiKhoan> optional = taiKhoanDAO.findById(tenDangNhap);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    // Thêm 1 đối tượng
    @PostMapping("taikhoan")
    public ResponseEntity<TaiKhoan> post(@RequestBody TaiKhoan taikhoan) {
        if (taiKhoanDAO.existsById(taikhoan.getTenDangNhap())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        TaiKhoan taikhoan2 = taiKhoanDAO.save(taikhoan);

        return ResponseEntity.ok(taikhoan2);
    }

    // Cập nhật 1 đối tượng dựa trên id
    @PutMapping("taikhoan/{id}")
    public ResponseEntity<TaiKhoan> put(@PathVariable("id") String tenDangNhap, @RequestBody TaiKhoan taikhoan) {
        if (!taiKhoanDAO.existsById(tenDangNhap)) {
            return ResponseEntity.notFound().build();
        }
        taiKhoanDAO.save(taikhoan);
        return ResponseEntity.ok(taikhoan);
    }

    // Xóa 1 đối tượng
    @DeleteMapping("taikhoan/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String tenDangNhap) {
        if (!taiKhoanDAO.existsById(tenDangNhap)) {
            return ResponseEntity.notFound().build();
        }
        taiKhoanDAO.deleteById(tenDangNhap);
        return ResponseEntity.ok().build();
    }

    @GetMapping("taikhoan/lopThi")
    public ResponseEntity<List<TaiKhoan>> getTaiKhoanInClass(@RequestParam("maLopThi") Integer maLopThi) {
        return ResponseEntity.ok(taiKhoanDAO.getTaiKhoanInClass(maLopThi));
    }

    @GetMapping("taikhoan/noClass")
    public ResponseEntity<List<TaiKhoan>> getTaiKhoanNotHaveClass() {
        return ResponseEntity.ok(taiKhoanDAO.getTaiKhoanNotHaveClass());
    }
}
