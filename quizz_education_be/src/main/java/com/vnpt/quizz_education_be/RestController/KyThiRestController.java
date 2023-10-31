package com.vnpt.quizz_education_be.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.vnpt.quizz_education_be.DAO.KiThiDAO;
import com.vnpt.quizz_education_be.DAO.PhanCongDAO;
import com.vnpt.quizz_education_be.Entity.KyThi;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Cho phép yêu cầu từ origin http://localhost:4200
@RequestMapping("/quizzeducation/api")
public class KyThiRestController {

    @Autowired
    KiThiDAO kyThiDAO;
    @Autowired
    PhanCongDAO phanCongDAO;

    @GetMapping("kythi")
    public ResponseEntity<List<KyThi>> findAll(@RequestParam("tenDangNhap") Optional<String> tenDangNhap) {
        if (tenDangNhap.isPresent()) {
            return ResponseEntity.ok(phanCongDAO.getKiThiPhanCongTaiKhoan(tenDangNhap));
        }
        return ResponseEntity.ok(kyThiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("kythi/{id}")
    public ResponseEntity<KyThi> findById(@PathVariable("id") Integer maKyThi) {
        Optional<KyThi> optional = kyThiDAO.findById(maKyThi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("kythi")
    public ResponseEntity<KyThi> post(@RequestBody KyThi kythi) {
        if (kyThiDAO.existsById(kythi.getMaKyThi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        KyThi kythi2 = kyThiDAO.save(kythi);
        return ResponseEntity.ok(kythi2);
    }

    @PutMapping("kythi/{id}")
    public ResponseEntity<KyThi> put(@PathVariable("id") Integer maKyThi, @RequestBody KyThi kythi) {
        if (!kyThiDAO.existsById(maKyThi)) {
            return ResponseEntity.notFound().build();
        }
        kyThiDAO.save(kythi);
        return ResponseEntity.ok(kythi);
    }

    @DeleteMapping("kythi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maKyThi) {
        if (!kyThiDAO.existsById(maKyThi)) {
            return ResponseEntity.notFound().build();
        }
        kyThiDAO.deleteById(maKyThi);
        return ResponseEntity.ok().build();
    }
}
