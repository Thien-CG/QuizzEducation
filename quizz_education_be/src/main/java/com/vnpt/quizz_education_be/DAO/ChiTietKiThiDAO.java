package com.vnpt.quizz_education_be.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vnpt.quizz_education_be.Entity.ChiTietKyThi;

import java.util.List;
import java.util.Optional;
import com.vnpt.quizz_education_be.Entity.LopThi;
import com.vnpt.quizz_education_be.Entity.MonThi;

@Repository
public interface ChiTietKiThiDAO extends JpaRepository<ChiTietKyThi, Integer> {
    @Query("SELECT p.monThi FROM ChiTietKyThi p WHERE p.kyThi.maKyThi = ?1")
    List<MonThi> getMonThiInKiThi(Optional<Integer> maKyThi);

    @Query("SELECT ct FROM ChiTietKyThi ct WHERE ct.kyThi.maKyThi = :maKyThi")
    List<ChiTietKyThi> findByMaKyThi(@Param("maKyThi") int maKyThi);

    @Query("SELECT ct FROM ChiTietKyThi ct WHERE ct.monThi.maMon = :maMon")
    List<ChiTietKyThi> findByMaMon(@Param("maMon") int maMon);

    @Query("SELECT ct FROM ChiTietKyThi ct WHERE ct.lopThi.maLopThi = :maLopThi")
    List<ChiTietKyThi> findByMaLopThi(@Param("maLopThi") int maLopThi);

    @Query("SELECT ct FROM ChiTietKyThi ct WHERE ct.kyThi.daDienRa = false AND ct.lopThi.maLopThi = :maLop")
    List<ChiTietKyThi> getAll(int maLop);
    @Query("SELECT p.monThi FROM ChiTietKyThi p WHERE p.kyThi.maKyThi = ?1")
    List<MonThi> getMonThiInKiThi(Integer maKyThi);

    @Query("SELECT p.lopThi FROM ChiTietKyThi p WHERE p.kyThi.maKyThi = ?1 AND p.monThi.maMon=?2")
    List<LopThi> getLopThiByKiThiAndMonThi(Integer maKyThi, Integer maMonThi);
}
