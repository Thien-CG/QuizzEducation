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
@Table(name = "Phancong")
public class PhanCong implements Serializable {

    @Id
    @Column(name = "ma_phan_cong")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maPhanCong;

    @Column(name = "da_tao_de")
    private Boolean daTaoDe;

    @Column(name = "thoi_han")
    private Date thoiHan;

    // Relationship N - 1
    @ManyToOne
    @JoinColumn(name = "ma_ky_thi")
    KyThi kyThi;

    @ManyToOne
    @JoinColumn(name = "ma_mon")
    MonThi monThi;

    @ManyToOne
    @JoinColumn(name = "ten_dang_nhap")
    TaiKhoan taiKhoan;

}
