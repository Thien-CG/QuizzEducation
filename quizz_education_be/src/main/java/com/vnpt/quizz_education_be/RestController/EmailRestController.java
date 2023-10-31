package com.vnpt.quizz_education_be.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnpt.quizz_education_be.DTO.EmailDTO;
import com.vnpt.quizz_education_be.Service.EmailService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class EmailRestController {
    
    @Autowired
    private EmailService emailService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDTO emailRequest) {
        emailService.sendEmail(emailRequest.getFrom(), emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
        return ResponseEntity.ok().build();
    }
}
