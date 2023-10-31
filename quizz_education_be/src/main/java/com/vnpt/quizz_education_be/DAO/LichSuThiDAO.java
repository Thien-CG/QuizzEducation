package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.Entity.LichSuThi;

public interface LichSuThiDAO extends JpaRepository<LichSuThi, Integer> {
    @Query("SELECT p FROM LichSuThi p WHERE p.boCauHoiDaLam.maBoCauHoiDaLam = ?1")
    List<LichSuThi> getLichSuThiByBoCauHoiDaLam(Integer maBoCauHoiDaLam);
    
}