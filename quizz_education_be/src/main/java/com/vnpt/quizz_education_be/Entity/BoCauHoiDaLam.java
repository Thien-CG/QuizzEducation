package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private Date thoiGianBatDau; // 10h

    @Column(name = "thoi_gian_ket_thuc")
    private Date thoiGianKetThuc; // 11h3

    @Column(name = "diem_so")
    private Float diemSo = 0.0f;

    @Column(name = "da_nop")
    private boolean daNop = false;

    // Relationship N - 1

    @ManyToOne
    @JoinColumn(name = "ma_de_thi")
    DeThi deThi;

    @JsonIgnore
    @ManyToOne(optional = true)
    @JoinColumn(name = "ten_dang_nhap")
    TaiKhoan taiKhoan;

    @JsonIgnore
    @OneToMany(mappedBy = "boCauHoiDaLam")
    List<LichSuThi> List_LichSuThi;

    public boolean getVaoThi() {
        Integer thoiGianLamBai = null;
        Date date = new Date();
        try {
            thoiGianLamBai = this.getDeThi().getThoiGianLamBai();
            long thoiGianThi = Math
                    .abs((date.getTime() - this.getThoiGianBatDau().getTime()) / 1000);
            if (thoiGianLamBai - thoiGianThi > 0) {
                return true;
            }
        } catch (Exception e) {
        }
        return false;
    }
}
