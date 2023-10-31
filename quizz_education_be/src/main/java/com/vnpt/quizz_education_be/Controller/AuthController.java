package com.vnpt.quizz_education_be.Controller;

import java.io.Console;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.vnpt.quizz_education_be.DAO.TaiKhoanDAO;
import com.vnpt.quizz_education_be.DAO.VaiTroDAO;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;
import com.vnpt.quizz_education_be.Entity.TaiKhoanJWT;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;
import com.vnpt.quizz_education_be.Entity.VaiTro;
import com.vnpt.quizz_education_be.Login.JwtTokenProvider;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/quizzeducation/api")
public class AuthController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TaiKhoanDAO accountDAO;

    // phương thức để đăng nhập
    @PostMapping("login")
    public ResponseEntity<TaiKhoan> LoginMethod(@RequestBody TaiKhoan account) throws JsonProcessingException {
        if (accountDAO.existsByTenDangNhap(account.getTenDangNhap())) {
           
            // lấy tài khoản đăng nhập đi check với DB
            TaiKhoan accountLogin = accountDAO.findByTenDangNhap(account.getTenDangNhap());
            if (accountLogin.getTenDangNhap().trim().equals(account.getTenDangNhap())
                    && accountLogin.getMatKhau().trim().equals(account.getMatKhau())) {

                //Tạo Entity lưu token cho ngắn        
                TaiKhoanJWT TKJWT = new TaiKhoanJWT();
                TKJWT.setTenDangNhap(accountLogin.getTenDangNhap());
                TKJWT.setMatKhau(accountLogin.getMatKhau());
                TKJWT.setTrangThai(accountLogin.getTrangThai());
                TKJWT.setTenVaiTro(accountLogin.getVaiTro().getTenVaiTro());

                // tạo token bằng lớp JwtTokenProvider
                String tokenAccount;

                tokenAccount = jwtTokenProvider.createToken(accountLogin, 3 * 60 * 60 * 1000); // nhớ tài khoản trong 3 ngày

                TaiKhoan token = new TaiKhoan();
                token.setToken(tokenAccount);
                return ResponseEntity.ok(token);
            }
        }

        TaiKhoan token = new TaiKhoan();
        token.setToken("191003");
        return ResponseEntity.ok(token);
    }

    @PostMapping("validatetoken")
    public ResponseEntity<Boolean> validateToken(@RequestBody TaiKhoan token) {
        return ResponseEntity.ok(jwtTokenProvider.validateToken(token.getToken()));
    }
}
