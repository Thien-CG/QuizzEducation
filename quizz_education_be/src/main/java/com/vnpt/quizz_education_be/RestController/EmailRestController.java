package com.vnpt.quizz_education_be.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.DTO.EmailDTO;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;
import com.vnpt.quizz_education_be.Service.EmailService;
import com.vnpt.quizz_education_be.Util.OtpGenerator;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Chỉ định origin của ứng dụng Angular
public class EmailRestController {

}
