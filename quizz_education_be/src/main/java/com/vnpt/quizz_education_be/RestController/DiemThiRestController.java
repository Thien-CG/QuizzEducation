package com.vnpt.quizz_education_be.RestController;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.BoCauHoiDaLamDAO;
import com.vnpt.quizz_education_be.DTO.DiemThiDTO;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class DiemThiRestController {

    @Autowired
    BoCauHoiDaLamDAO boCauHoiDaLamDAO;

    @GetMapping("bangdiem/{tenDangNhap}")
    public ResponseEntity<?> getBangDiem(@PathVariable("tenDangNhap") String tenDangNhap) {
        Date date = new Date();
        List<DiemThiDTO> list = boCauHoiDaLamDAO.getBangDiem(tenDangNhap, date);
        return ResponseEntity.ok(list);
    }
}
