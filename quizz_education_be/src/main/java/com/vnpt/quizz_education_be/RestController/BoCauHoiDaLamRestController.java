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

import com.vnpt.quizz_education_be.DAO.BoCauHoiDaLamDAO;
import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class BoCauHoiDaLamRestController {
    @Autowired
    BoCauHoiDaLamDAO boCauHoiDaLamDAO;

    @GetMapping("bocauhoidalam")
    public ResponseEntity<List<BoCauHoiDaLam>> findAll() {
        return ResponseEntity.ok(boCauHoiDaLamDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("bocauhoidalam/{id}")
    public ResponseEntity<BoCauHoiDaLam> findById(@PathVariable("id") Integer maBoCauHoiDaLam) {
        Optional<BoCauHoiDaLam> optional = boCauHoiDaLamDAO.findById(maBoCauHoiDaLam);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("bocauhoidalam")
    public ResponseEntity<BoCauHoiDaLam> post(@RequestBody BoCauHoiDaLam bocauhoidalam) {
        if (boCauHoiDaLamDAO.existsById(bocauhoidalam.getMaBoCauHoiDaLam())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        BoCauHoiDaLam bocauhoidalam2 = boCauHoiDaLamDAO.save(bocauhoidalam);
        return ResponseEntity.ok(bocauhoidalam2);
    }

    @PutMapping("bocauhoidalam/{id}")
    public ResponseEntity<BoCauHoiDaLam> put(@PathVariable("id") Integer maBoCauHoiDaLam,
            @RequestBody BoCauHoiDaLam bocauhoidalam) {
        if (!boCauHoiDaLamDAO.existsById(maBoCauHoiDaLam)) {
            return ResponseEntity.notFound().build();
        }
        boCauHoiDaLamDAO.save(bocauhoidalam);
        return ResponseEntity.ok(bocauhoidalam);
    }

    @DeleteMapping("bocauhoidalam/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maBoCauHoiDaLam) {
        if (!boCauHoiDaLamDAO.existsById(maBoCauHoiDaLam)) {
            return ResponseEntity.notFound().build();
        }
        boCauHoiDaLamDAO.deleteById(maBoCauHoiDaLam);
        return ResponseEntity.ok().build();
    }

    @GetMapping("bocauhoi")
    public ResponseEntity<BoCauHoiDaLam> getBoCauHoiBangUsernameVaKiThi(
            @RequestParam("tenDangNhap") String username,
            @RequestParam("maKiThi") Integer maKiThi,
            @RequestParam("maMon") Integer maMon) {
        return ResponseEntity.ok(boCauHoiDaLamDAO.getBoCauHoiBangUsernameVaKiThi(username, maKiThi, maMon));
    }
}
