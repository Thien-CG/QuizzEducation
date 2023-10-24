package com.vnpt.quizz_education_be.DTO;

import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;

import lombok.Data;

@Data
public class DiemThiDTO {

    private String tenKyThi;
    private String tenMon;
    private Float diemSo;
    private String trangThai;
    private Integer maKyThi;
    private String tenDangNhap;

    public DiemThiDTO(BoCauHoiDaLam boCauHoiDaLam) {
        try {
            this.tenKyThi = boCauHoiDaLam.getDeThi().getChiTietKyThi().getKyThi().getTenKyThi();
            this.maKyThi = boCauHoiDaLam.getDeThi().getChiTietKyThi().getKyThi().getMaKyThi();
        } catch (Exception e) {
        }

        try {
            this.tenKyThi = boCauHoiDaLam.getDeThi().getMonThi().getTenMon();
        } catch (Exception e) {
        }

        this.diemSo = boCauHoiDaLam.getDiemSo();
        if (boCauHoiDaLam.getDiemSo() >= 5) {
            this.trangThai = "Đạt";
        } else {
            this.trangThai = "Chưa đạt";
        }

    }

}
