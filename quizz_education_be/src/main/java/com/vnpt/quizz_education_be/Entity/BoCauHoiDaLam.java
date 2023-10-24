package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Bocauhoidalam")
public class BoCauHoiDaLam implements Serializable {

    @Id
    @Column(name = "ma_bo_cau_hoi_da_lam")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBoCauHoiDaLam;

    @Column(name = "thoi_gian_bat_dau")
    private Date thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private Date thoiGianKetThuc;

    @Column(name = "diem_so")
    private Float diemSo;

    // Relationship N - 1

    @ManyToOne
    @JoinColumn(name = "ma_de_thi")
    DeThi deThi;

    @ManyToOne
    @JoinColumn(name = "ten_dang_nhap")
    TaiKhoan taiKhoan;

}
