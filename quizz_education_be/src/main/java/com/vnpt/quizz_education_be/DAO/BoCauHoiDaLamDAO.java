package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.DTO.DiemThiDTO;
import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;

public interface BoCauHoiDaLamDAO extends JpaRepository<BoCauHoiDaLam, Integer> {
    @Query("SELECT new com.vnpt.quizz_education_be.DTO.DiemThiDTO(o) FROM BoCauHoiDaLam o WHERE o.taiKhoan.tenDangNhap = :tenDangNhap")
    List<DiemThiDTO> getBangDiem(String tenDangNhap);

    @Query("SELECT p FROM BoCauHoiDaLam p WHERE p.taiKhoan.tenDangNhap = ?1 AND p.deThi.chiTietKyThi.kyThi.maKyThi = ?2 AND p.deThi.monThi.maMon = ?3")
    BoCauHoiDaLam getBoCauHoiBangUsernameVaKiThi(String tenDangNhap, Integer maKyThi, Integer maMon);
}
