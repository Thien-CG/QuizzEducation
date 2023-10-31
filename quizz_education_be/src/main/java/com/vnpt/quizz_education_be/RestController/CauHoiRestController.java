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

import com.vnpt.quizz_education_be.DAO.CauHoiDAO;
import com.vnpt.quizz_education_be.Entity.CauHoi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class CauHoiRestController {
    @Autowired
    CauHoiDAO cauHoiDAO;

    @GetMapping("cauhoi")
    public ResponseEntity<List<CauHoi>> findAll() {
        return ResponseEntity.ok(cauHoiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("cauhoi/{id}")
    public ResponseEntity<CauHoi> findById(@PathVariable("id") Integer maCauHoi) {
        Optional<CauHoi> optional = cauHoiDAO.findById(maCauHoi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("cauhoi")
    public ResponseEntity<CauHoi> post(@RequestBody CauHoi cauhoi) {
        if (cauHoiDAO.existsById(cauhoi.getMaCauHoi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        CauHoi cauhoi2 = cauHoiDAO.save(cauhoi);
        return ResponseEntity.ok(cauhoi2);
    }

    @PutMapping("cauhoi/{id}")
    public ResponseEntity<CauHoi> put(@PathVariable("id") Integer maCauHoi, @RequestBody CauHoi cauhoi) {
        if (!cauHoiDAO.existsById(maCauHoi)) {
            return ResponseEntity.notFound().build();
        }
        cauHoiDAO.save(cauhoi);
        return ResponseEntity.ok(cauhoi);
    }

    @DeleteMapping("cauhoi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer staffId) {
        if (!cauHoiDAO.existsById(staffId)) {
            return ResponseEntity.notFound().build();
        }
        cauHoiDAO.deleteById(staffId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("listCauHoi")
    public ResponseEntity<List<CauHoi>> getListCauHoi(@RequestParam("maDeThi") Integer maDeThi) {
        return ResponseEntity.ok(cauHoiDAO.getCauHoiByDeThi(maDeThi));
    }
}
