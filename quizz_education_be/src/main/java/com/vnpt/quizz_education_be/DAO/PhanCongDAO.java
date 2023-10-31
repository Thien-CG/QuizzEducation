package com.vnpt.quizz_education_be.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.Entity.KyThi;
import com.vnpt.quizz_education_be.Entity.MonThi;
import com.vnpt.quizz_education_be.Entity.PhanCong;

public interface PhanCongDAO extends JpaRepository<PhanCong, Integer> {
    @Query("SELECT p.kyThi FROM PhanCong p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<KyThi> getKiThiPhanCongTaiKhoan(Optional<String> tenDangNhap);

    @Query("SELECT p.monThi FROM PhanCong p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<MonThi> getMonThiPhanCongTaiKhoan(Optional<String> tenDangNhap);

    @Query("SELECT p FROM PhanCong p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<PhanCong> getByUsername(String username);
}
