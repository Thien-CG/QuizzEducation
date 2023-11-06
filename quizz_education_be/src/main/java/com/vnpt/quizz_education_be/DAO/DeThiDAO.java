package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.Entity.DeThi;

public interface DeThiDAO extends JpaRepository<DeThi, Integer> {
    @Query("SELECT p FROM DeThi p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<DeThi> getByUsername(String username);
}
