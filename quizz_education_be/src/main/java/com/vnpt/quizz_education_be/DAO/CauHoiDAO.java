package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vnpt.quizz_education_be.Entity.CauHoi;

public interface CauHoiDAO extends JpaRepository<CauHoi, Integer> {
    @Query("SELECT pc FROM CauHoi pc WHERE pc.deThi.maDeThi = :maDeThi")
    List<CauHoi> findByMaDeThi(@Param("maDeThi") int maDeThi);
}
