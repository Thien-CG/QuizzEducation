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
import com.vnpt.quizz_education_be.DAO.KiThiDAO;
import com.vnpt.quizz_education_be.Entity.ChiTietKyThi;
import com.vnpt.quizz_education_be.Entity.LopThi;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/quizzeducation/api")
public class ChiTietKyThiRestController {
    @Autowired
    ChiTietKiThiDAO chiTietKyThiDAO;

    @Autowired
    KiThiDAO kyThiDAO;

    @GetMapping("chitietkythi")
    public ResponseEntity<List<ChiTietKyThi>> findAll() {
        return ResponseEntity.ok(chiTietKyThiDAO.findAll());
    }

    // Get 1 đối tượng thông qua id
    @GetMapping("chitietkythi/{id}")
    public ResponseEntity<ChiTietKyThi> findById(@PathVariable("id") Integer maChiTietKyThi) {
        Optional<ChiTietKyThi> optional = chiTietKyThiDAO.findById(maChiTietKyThi);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(optional.get());
    }

    // Get 1 đối tượng thông qua id kì thi
    @GetMapping("chitietkythi/kythi/{id}")
    public ResponseEntity<List<ChiTietKyThi>> findByMaKyThi(@PathVariable("id") int maKyThi) {
        List<ChiTietKyThi> resultList = chiTietKyThiDAO.findByMaKyThi(maKyThi);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }

    @GetMapping("chitietkythi/kythi/create/{id}")
    public ResponseEntity<List<ChiTietKyThi>> findByIdKyThi(@PathVariable("id") int maKyThi) {
        List<ChiTietKyThi> resultList = chiTietKyThiDAO.findByIdKyThi(maKyThi);
        return ResponseEntity.ok(resultList);
    }

    // Get 1 đối tượng thông qua id của môn thi
    @GetMapping("chitietkythi/monthi/{id}")
    public ResponseEntity<List<ChiTietKyThi>> findByMaMon(@PathVariable("id") int maMon) {
        List<ChiTietKyThi> resultList = chiTietKyThiDAO.findByMaMon(maMon);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }

    // Get 1 đối tượng thông qua id của môn thi
    @GetMapping("chitietkythi/lopthi/{id}")
    public ResponseEntity<List<ChiTietKyThi>> findByMaLopThi(@PathVariable("id") int maLop) {
        List<ChiTietKyThi> resultList = chiTietKyThiDAO.findByMaLopThi(maLop);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }

    @PostMapping("chitietkythi")
    public ResponseEntity<ChiTietKyThi> post(@RequestBody ChiTietKyThi chitietkythi) {
        if (chiTietKyThiDAO.existsById(chitietkythi.getMaChiTietKyThi())) {
            return ResponseEntity.badRequest().build();
            // 400 Bad Request: Địa chỉ tồi
        }
        ChiTietKyThi chitietkythi2 = chiTietKyThiDAO.save(chitietkythi);
        return ResponseEntity.ok(chitietkythi2);
    }

    @PutMapping("chitietkythi/{id}")
    public ResponseEntity<ChiTietKyThi> put(@PathVariable("id") Integer maChiTietKyThi,
            @RequestBody ChiTietKyThi chitietkythi) {
        if (!chiTietKyThiDAO.existsById(maChiTietKyThi)) {
            return ResponseEntity.notFound().build();
        }
        chiTietKyThiDAO.save(chitietkythi);
        return ResponseEntity.ok(chitietkythi);
    }

    @DeleteMapping("chitietkythi/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer maChiTietKyThi) {

        chiTietKyThiDAO.deleteById(maChiTietKyThi);

        return ResponseEntity.ok().build();
    }

    // @GetMapping("monthi")
    // public ResponseEntity<List<MonThi>>
    // findMonThiByKiThiId(@RequestParam("kithi") Integer kiThiId) {
    // return ResponseEntity.ok(chiTietKyThiDAO.getMonThiInKiThi(kiThiId));
    // }

    // @GetMapping("lopthi")
    // public ResponseEntity<List<LopThi>>
    // getLopThiByKyThiAndMonThi(@RequestParam("kithi") Integer kithiId,
    // @RequestParam("monthi") Integer monThiId) {
    // return ResponseEntity.ok(chiTietKyThiDAO.getLopThiByKiThiAndMonThi(kithiId,
    // monThiId));
    // }

    @GetMapping("chitietkythi/kythi/{id}/monthi/{idMon}")
    public ResponseEntity<List<ChiTietKyThi>> getLopThiByKiThiAndMonThi(@PathVariable("id") int maKyThi,
            @PathVariable("idMon") int maMonThi) {
        List<ChiTietKyThi> resultList = chiTietKyThiDAO.getLopThiByKyThiAndMonThi(maKyThi, maMonThi);

        return ResponseEntity.ok(resultList);
    }
}
