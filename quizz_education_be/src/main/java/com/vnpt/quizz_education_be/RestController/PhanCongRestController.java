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
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.PhanCongDAO;
import com.vnpt.quizz_education_be.Entity.ChiTietKyThi;
import com.vnpt.quizz_education_be.Entity.PhanCong;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class PhanCongRestController {

    @Autowired
    PhanCongDAO phanCongDAO;

    @GetMapping("phancong")
    public ResponseEntity<List<PhanCong>> findAll() {
        return ResponseEntity.ok(phanCongDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("phancong/{id}")
    public ResponseEntity<PhanCong> findById(@PathVariable("id") Integer maPhanCong) {
        Optional<PhanCong> optional = phanCongDAO.findById(maPhanCong);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    // tìm kiếm phân công theo username
    @GetMapping("phancong/taikhoan/{id}")
    public ResponseEntity<List<PhanCong>> getByUsername(@PathVariable("id") String username) {
        List<PhanCong> resultList = phanCongDAO.getByUsername(username);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }

    @PostMapping("phancong")
    public ResponseEntity<PhanCong> post(@RequestBody PhanCong phancong) {
        if (phanCongDAO.existsById(phancong.getMaPhanCong())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        PhanCong phancong2 = phanCongDAO.save(phancong);
        return ResponseEntity.ok(phancong2);
    }

    @PutMapping("phancong/{id}")
    public ResponseEntity<PhanCong> put(@PathVariable("id") Integer maPhanCong, @RequestBody PhanCong phancong) {
        if (!phanCongDAO.existsById(maPhanCong)) {
            return ResponseEntity.notFound().build();
        }
        phanCongDAO.save(phancong);
        return ResponseEntity.ok(phancong);
    }

    @DeleteMapping("phancong/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maPhanCong) {
        if (!phanCongDAO.existsById(maPhanCong)) {
            return ResponseEntity.notFound().build();
        }
        phanCongDAO.deleteById(maPhanCong);
        return ResponseEntity.ok().build();
    }
}
