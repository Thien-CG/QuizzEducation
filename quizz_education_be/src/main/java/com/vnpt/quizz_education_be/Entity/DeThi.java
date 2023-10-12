package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vnpt.quizz_education_be.DAO.ChiTietKiThiDAO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Dethi")
public class DeThi implements Serializable {

    @Id
    @Column(name = "ma_de_thi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maDeThi;

    @Column(name = "ten_de_thi")
    private String tenDeThi;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "da_su_dung")
    private Boolean daSuDung;

    // Relationship N - 1

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ma_chi_tiet_ky_thi")
    ChiTietKyThi ChiTietKyThi;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ten_dang_nhap")
    TaiKhoan taiKhoan;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ma_mon")
    MonThi monThi;

}
