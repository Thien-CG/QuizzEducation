package com.vnpt.quizz_education_be.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.KiThiDAO;
import com.vnpt.quizz_education_be.Entity.KyThi;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class KyThiRestController {

    @Autowired
    KiThiDAO kyThiDAO;

    @GetMapping("kythi")
    public ResponseEntity<List<KyThi>> findAll() {
        return ResponseEntity.ok(kyThiDAO.findAll());
    }

}
