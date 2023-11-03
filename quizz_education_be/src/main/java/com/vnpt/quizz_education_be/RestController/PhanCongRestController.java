package com.vnpt.quizz_education_be.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
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

import com.vnpt.quizz_education_be.DAO.PhanCongDAO;
import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.Entity.ChiTietKyThi;
import com.vnpt.quizz_education_be.Entity.KyThi;
import com.vnpt.quizz_education_be.Entity.PhanCong;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class PhanCongRestController {

    @Autowired
    TaiKhoanDAO taiKhoanDAO;
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
    //get 1 đối tượng qua id môn thi
   @GetMapping("phancong/monthi/{id}")
   public ResponseEntity<List<PhanCong>> findByMaMon(@PathVariable("id") int maMon) {
       List<PhanCong> resultList = phanCongDAO.findByMaMon(maMon);
       if (resultList.isEmpty()) {
           return ResponseEntity.notFound().build();
       }
       return ResponseEntity.ok(resultList);
   }
    //get 1 đối tượng qua id ki thi
    @GetMapping("phancong/kithi/{id}")
    public ResponseEntity<List<PhanCong>> findByMaKyThi(@PathVariable("id") int maKyThi) {
        List<PhanCong> resultList = phanCongDAO.findByMaKyThi(maKyThi);
        if (resultList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resultList);
    }
    @RequestMapping("phancong/taikhoan/{id}")
    public ResponseEntity<List<PhanCong>> findByUsername(@PathVariable("id") String tenDangNhap) {
        List<PhanCong> phanCongList = phanCongDAO.findByUsername(tenDangNhap);
        if (phanCongList.isEmpty()) {
          return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(phanCongList);
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
