package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Entity
@Data
@Table(name = "Kythi")
public class KyThi implements Serializable {

    @Id
    @Column(name = "ma_ky_thi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maKyThi;

    @Column(name = "ten_ky_thi")
    private String tenKyThi;

    @Column(name = "da_dien_ra")
    private Boolean daDienRa;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "thoi_gian_bat_dau")
    private Date thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private Date thoiGianKetThuc;

    // Relationship N - 1

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ten_dang_nhap")
    TaiKhoan taiKhoan;

}
