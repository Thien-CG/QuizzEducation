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

import com.vnpt.quizz_education_be.DAO.DeThiDAO;
import com.vnpt.quizz_education_be.Entity.DeThi;
import com.vnpt.quizz_education_be.Entity.PhanCong;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class DeThiRestController {
    @Autowired
    DeThiDAO deThiDAO;

    @GetMapping("dethi")
    public ResponseEntity<List<DeThi>> findAll() {
        return ResponseEntity.ok(deThiDAO.findAll());
    }
    
    
    // Get 1 đối tượng thông qua id
    @GetMapping("dethi/{id}")
    public ResponseEntity<DeThi> findById(@PathVariable("id") Integer maDeThi) {
        Optional<DeThi> optional = deThiDAO.findById(maDeThi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    // tìm kiếm đề thi theo username của giáo viên tạo đề
    @GetMapping("dethi/taikhoan/{id}")
    public ResponseEntity<List<DeThi>> getByUsername(@PathVariable("id") String username) {
        List<DeThi> resultList = deThiDAO.getByUsername(username);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }

    @PostMapping("dethi")
    public ResponseEntity<DeThi> post(@RequestBody DeThi dethi) {
        if (deThiDAO.existsById(dethi.getMaDeThi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        DeThi dethi2 = deThiDAO.save(dethi);
        return ResponseEntity.ok(dethi2);
    }

    @PutMapping("dethi/{id}")
    public ResponseEntity<DeThi> put(@PathVariable("id") Integer maDeThi, @RequestBody DeThi dethi) {
        if (!deThiDAO.existsById(maDeThi)) {
            return ResponseEntity.notFound().build();
        }
        deThiDAO.save(dethi);
        return ResponseEntity.ok(dethi);
    }

    @DeleteMapping("dethi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maDeThi) {
        if (!deThiDAO.existsById(maDeThi)) {
            return ResponseEntity.notFound().build();
        }

        deThiDAO.deleteById(maDeThi);

        return ResponseEntity.ok().build();
    }
}
