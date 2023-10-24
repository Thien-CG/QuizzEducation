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

import com.vnpt.quizz_education_be.DAO.ChiTietKiThiDAO;
import com.vnpt.quizz_education_be.DAO.LopThiDAO;
import com.vnpt.quizz_education_be.Entity.LopThi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class LopThiRestController {

    @Autowired
    LopThiDAO lopThiDAO;

    @Autowired
    ChiTietKiThiDAO chiTietKiThiDAO;

    @GetMapping("lopthi")
    public ResponseEntity<List<LopThi>> findAll() {
    return ResponseEntity.ok(lopThiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("lopthi/{id}")
    public ResponseEntity<LopThi> findById(@PathVariable("id") Integer maLopThi) {
        Optional<LopThi> optional = lopThiDAO.findById(maLopThi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("lopthi")
    public ResponseEntity<LopThi> post(@RequestBody LopThi lopthi) {
        if (lopThiDAO.existsById(lopthi.getMaLopThi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        LopThi lopthi2 = lopThiDAO.save(lopthi);
        return ResponseEntity.ok(lopthi2);
    }

    @PutMapping("lopthi/{id}")
    public ResponseEntity<LopThi> put(@PathVariable("id") Integer maLopThi, @RequestBody LopThi lopthi) {
        if (!lopThiDAO.existsById(maLopThi)) {
            return ResponseEntity.notFound().build();
        }
        lopThiDAO.save(lopthi);
        return ResponseEntity.ok(lopthi);
    }

    @DeleteMapping("lopthi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maLopThi) {
        if (!lopThiDAO.existsById(maLopThi)) {
            return ResponseEntity.notFound().build();
        }
        lopThiDAO.deleteById(maLopThi);
        return ResponseEntity.ok().build();
    }
}
