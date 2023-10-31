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

import com.vnpt.quizz_education_be.DAO.ChiTietKiThiDAO;
import com.vnpt.quizz_education_be.DAO.MonThiDAO;
import com.vnpt.quizz_education_be.DAO.PhanCongDAO;
import com.vnpt.quizz_education_be.Entity.MonThi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class MonThiRestController {

    @Autowired
    MonThiDAO monThiDAO;
    @Autowired
    PhanCongDAO phanCongDAO;
    @Autowired
    ChiTietKiThiDAO chiTietKiThiDAO;

    @GetMapping("monthi")
    public ResponseEntity<List<MonThi>> findAll(@RequestParam("tenDangNhap") Optional<String> tenDangNhap,
            @RequestParam("kithi") Optional<Integer> kiThiId) {
        if (tenDangNhap.isPresent()) {
            return ResponseEntity.ok(phanCongDAO.getMonThiPhanCongTaiKhoan(tenDangNhap));
        } else if (kiThiId.isPresent()) {
            return ResponseEntity.ok(chiTietKiThiDAO.getMonThiInKiThi(kiThiId));
        }
        return ResponseEntity.ok(monThiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("monthi/{id}")
    public ResponseEntity<MonThi> findById(@PathVariable("id") Integer maMon) {
        Optional<MonThi> optional = monThiDAO.findById(maMon);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("monthi")
    public ResponseEntity<MonThi> post(@RequestBody MonThi monthi) {
        if (monThiDAO.existsById(monthi.getMaMon())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        MonThi monthi2 = monThiDAO.save(monthi);
        return ResponseEntity.ok(monthi2);
    }

    @PutMapping("monthi/{id}")
    public ResponseEntity<MonThi> put(@PathVariable("id") Integer maMon, @RequestBody MonThi monthi) {
        if (!monThiDAO.existsById(maMon)) {
            return ResponseEntity.notFound().build();
        }
        monThiDAO.save(monthi);
        return ResponseEntity.ok(monthi);
    }

    @DeleteMapping("monthi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maMon) {
        if (!monThiDAO.existsById(maMon)) {
            return ResponseEntity.notFound().build();
        }

        monThiDAO.deleteById(maMon);

        return ResponseEntity.ok().build();
    }
}
