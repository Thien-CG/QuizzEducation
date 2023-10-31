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

import com.vnpt.quizz_education_be.DAO.LichSuThiDAO;
import com.vnpt.quizz_education_be.Entity.LichSuThi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class LichSuThiRestController {
    @Autowired
    LichSuThiDAO lichSuThiDAO;

    @GetMapping("lichsuthi")
    public ResponseEntity<List<LichSuThi>> findAll() {
        return ResponseEntity.ok(lichSuThiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("lichsuthi/{id}")
    public ResponseEntity<LichSuThi> findById(@PathVariable("id") Integer maLichSuThi) {
        Optional<LichSuThi> optional = lichSuThiDAO.findById(maLichSuThi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("lichsuthi")
    public ResponseEntity<LichSuThi> post(@RequestBody LichSuThi lichsuthi) {
        if (lichSuThiDAO.existsById(lichsuthi.getMaLichSuThi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        LichSuThi lichsuthi2 = lichSuThiDAO.save(lichsuthi);
        return ResponseEntity.ok(lichsuthi2);
    }

    @PutMapping("lichsuthi/{id}")
    public ResponseEntity<LichSuThi> put(@PathVariable("id") Integer maLichSuThi, @RequestBody LichSuThi lichsuthi) {
        if (!lichSuThiDAO.existsById(maLichSuThi)) {
            return ResponseEntity.notFound().build();
        }
        lichSuThiDAO.save(lichsuthi);
        return ResponseEntity.ok(lichsuthi);
    }

    @DeleteMapping("lichsuthi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maLichSuThi) {
        if (!lichSuThiDAO.existsById(maLichSuThi)) {
            return ResponseEntity.notFound().build();
        }
        lichSuThiDAO.deleteById(maLichSuThi);
        return ResponseEntity.ok().build();
    }

    @GetMapping("dapAnDaChon")
    public List<LichSuThi> selectedAnswer(@RequestParam("maBoCauHoiDaLam") Integer maBoCauHoiDaLam) {
        return lichSuThiDAO.getLichSuThiByBoCauHoiDaLam(maBoCauHoiDaLam);
    }
}
