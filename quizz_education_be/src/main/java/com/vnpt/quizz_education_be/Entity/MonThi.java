package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Monthi")
public class MonThi implements Serializable {

    @Id
    @Column(name = "ma_mon")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maMon;

    @Column(name = "ten_mon")
    private String tenMon;

    @Column(name = "thoi_gian_lam_bai")
    private Float thoiGianLamBai;

}
