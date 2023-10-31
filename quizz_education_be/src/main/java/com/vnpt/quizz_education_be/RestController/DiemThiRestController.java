package com.vnpt.quizz_education_be.RestController;

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
@RequestMapping("/quizzeducation/api/bangDiem")
public class DiemThiRestController {

    @Autowired
    BoCauHoiDaLamDAO boCauHoiDaLamDAO;

    @GetMapping("/{tenDangNhap}")
    public ResponseEntity<?> getBangDiem(@PathVariable("tenDangNhap") String tenDangNhap) {
        List<DiemThiDTO> list = boCauHoiDaLamDAO.getBangDiem(tenDangNhap);
        return ResponseEntity.ok(list);
    }
}
