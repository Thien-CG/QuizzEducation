package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Chitietkythi")
public class ChiTietKyThi implements Serializable {
    
    @Id
    @Column(name = "ma_chi_tiet_ky_thi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maChiTietKyThi;

    @Column(name = "thoi_gian_bat_dau")
    private Date thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    private Date thoiGianKetThuc;

    // Relationship N - 1

    @ManyToOne
    @JoinColumn(name = "ma_ky_thi")
    KyThi kyThi;

    @ManyToOne
    @JoinColumn(name = "ma_mon")
    MonThi monThi;

    @ManyToOne
    @JoinColumn(name = "ma_lop")
    LopThi lopThi;

    
}
