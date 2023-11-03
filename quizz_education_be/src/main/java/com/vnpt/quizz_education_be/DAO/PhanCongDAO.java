package com.vnpt.quizz_education_be.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vnpt.quizz_education_be.Entity.KyThi;
import com.vnpt.quizz_education_be.Entity.MonThi;
import com.vnpt.quizz_education_be.Entity.PhanCong;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;

public interface PhanCongDAO extends JpaRepository<PhanCong, Integer> {
  
    
    @Query("SELECT o FROM PhanCong o WHERE o.taiKhoan.tenDangNhap=?1")
	List<PhanCong> findByUsername(String tenDangNhap);

     @Query("SELECT pc FROM PhanCong pc WHERE pc.kyThi.maKyThi = :maKyThi")
    List<PhanCong> findByMaKyThi(@Param("maKyThi") int maKyThi);

    @Query("SELECT pc FROM PhanCong pc WHERE pc.monThi.maMon = :maMon")
    List<PhanCong> findByMaMon(@Param("maMon") int maMon);

    @Query("SELECT p.kyThi FROM PhanCong p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<KyThi> getKiThiPhanCongTaiKhoan(Optional<String> tenDangNhap);

    @Query("SELECT p.monThi FROM PhanCong p WHERE p.taiKhoan.tenDangNhap = ?1")
    List<MonThi> getMonThiPhanCongTaiKhoan(Optional<String> tenDangNhap);

}
