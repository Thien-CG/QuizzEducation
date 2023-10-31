package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vnpt.quizz_education_be.Entity.DapAn;

public interface DapAnDAO extends JpaRepository<DapAn, Integer> {
    @Query("SELECT p FROM DapAn p WHERE p.cauHoi.deThi.maDeThi = ?1")
    List<DapAn> getDapAnInDeThi(Integer maDeThi);
}
