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

import com.vnpt.quizz_education_be.DAO.DapAnDAO;
import com.vnpt.quizz_education_be.Entity.DapAn;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class DapAnRestController {
    @Autowired
    DapAnDAO dapAnDAO;

    @GetMapping("dapan")
    public ResponseEntity<List<DapAn>> findAll() {
        return ResponseEntity.ok(dapAnDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("dapan/{id}")
    public ResponseEntity<DapAn> findById(@PathVariable("id") Integer maDapAn) {
        Optional<DapAn> optional = dapAnDAO.findById(maDapAn);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("dapan")
    public ResponseEntity<DapAn> post(@RequestBody DapAn dapan) {
        if (dapAnDAO.existsById(dapan.getMaDapAn())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        DapAn dapan2 = dapAnDAO.save(dapan);
        return ResponseEntity.ok(dapan2);
    }

    @PutMapping("dapan/{id}")
    public ResponseEntity<DapAn> put(@PathVariable("id") Integer maDapAn, @RequestBody DapAn dapan) {
        if (!dapAnDAO.existsById(maDapAn)) {
            return ResponseEntity.notFound().build();
        }
        dapAnDAO.save(dapan);
        return ResponseEntity.ok(dapan);
    }

    @DeleteMapping("dapan/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maDapAn) {
        if (!dapAnDAO.existsById(maDapAn)) {
            return ResponseEntity.notFound().build();
        }
        dapAnDAO.deleteById(maDapAn);
        return ResponseEntity.ok().build();
    }

    @GetMapping("dapanDeThi")
    public ResponseEntity<List<DapAn>> getDapAnInDeThi(@RequestParam("maDeThi") Integer maDeThi) {
        return ResponseEntity.ok(dapAnDAO.getDapAnInDeThi(maDeThi));
    }
}
