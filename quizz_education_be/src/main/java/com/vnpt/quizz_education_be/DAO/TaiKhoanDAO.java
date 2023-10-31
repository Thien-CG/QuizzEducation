package com.vnpt.quizz_education_be.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vnpt.quizz_education_be.Entity.TaiKhoan;

@Repository
public interface TaiKhoanDAO extends JpaRepository<TaiKhoan, String> {
    @Query("SELECT p FROM TaiKhoan p WHERE p.lopThi.maLopThi = ?1 AND p.vaiTro.maVaiTro = 1")
    List<TaiKhoan> getTaiKhoanInClass(Integer maLopThi);

    @Query("SELECT p FROM TaiKhoan p WHERE p.lopThi = null")
    List<TaiKhoan> getTaiKhoanNotHaveClass();

    // @Query("SELECT tk FROM TaiKhoan tk WHERE tk.vaiTro.maVaiTro = 1")
    // List<TaiKhoan> findByHocSinh();

    public TaiKhoan findByTenDangNhap(String tenDangNhap);

    public boolean existsByTenDangNhap(String tenDangNhap);

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.vaiTro.maVaiTro = 1  ORDER BY ngayTaoTaiKhoan DESC")
    List<TaiKhoan> findByHocSinh();

    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.vaiTro.maVaiTro = 2  ORDER BY ngayTaoTaiKhoan DESC")
    List<TaiKhoan> findByGiaoVien();


}
