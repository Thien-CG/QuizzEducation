package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.Entity.CauHoi;

public interface CauHoiDAO extends JpaRepository<CauHoi, Integer> {
    @Query("SELECT p FROM CauHoi p WHERE p.deThi.maDeThi = ?1")
    List<CauHoi> getCauHoiByDeThi(Integer maDeThi);
}
