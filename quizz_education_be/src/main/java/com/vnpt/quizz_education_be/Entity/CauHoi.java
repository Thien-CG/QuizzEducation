package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Cauhoi")
public class CauHoi implements Serializable {
    
    @Id
    @Column(name = "ma_cau_hoi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maCauHoi;

    @Column(name = "noi_dung_cau_hoi")
    private String noiDungCauHoi;

    @Column(name = "diem_cau_hoi")
    private Float diemCauHoi;

    @Column(name = "nhieu_dap_an")
    private Boolean nhieuDapAn;

    // Relationship N - 1

    @ManyToOne
    @JoinColumn(name = "ma_de_thi")
    DeThi deThi;
}

