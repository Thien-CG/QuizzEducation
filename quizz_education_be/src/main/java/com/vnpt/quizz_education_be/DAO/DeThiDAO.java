package com.vnpt.quizz_education_be.DAO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vnpt.quizz_education_be.Entity.DeThi;

public interface DeThiDAO extends JpaRepository<DeThi, Integer> {
  @Query("SELECT dt FROM DeThi dt WHERE dt.chiTietKyThi.maChiTietKyThi = :maChiTietKyThi")
    List<DeThi> findByMaChiTietKyThi(@Param("maChiTietKyThi") int maChiTietKyThi);

    @Query("SELECT dt FROM DeThi dt WHERE dt.monThi.maMon = :maMon")
    List<DeThi> findByMaMonInDeThi(@Param("maMon") int maMon);
}
