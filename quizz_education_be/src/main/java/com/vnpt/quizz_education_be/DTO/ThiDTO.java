package com.vnpt.quizz_education_be.DTO;

import java.io.Serializable;
import java.util.Date;

import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;
import com.vnpt.quizz_education_be.Entity.DapAn;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThiDTO implements Serializable {

    long thoiGianLamBai;

    BoCauHoiDaLam boCauHoiDaLam;

    public ThiDTO(BoCauHoiDaLam boCauHoiDaLam) {
        this.boCauHoiDaLam = boCauHoiDaLam;
        try {
            if (boCauHoiDaLam.getThoiGianBatDau() == null) {
                this.thoiGianLamBai = boCauHoiDaLam.getDeThi().getThoiGianLamBai();
            } else {
                // Date thoiGianKetThuc =
                // boCauHoiDaLam.getDeThi().getChiTietKyThi().getThoiGianKetThuc();
                // if (thoiGianKetThuc.before(date)) {
                // date = thoiGianKetThuc;
                // }
                long a = boCauHoiDaLam.getThoiGianBatDau().getTime();
                long b = new Date().getTime();
                long thoiGianDaSuDung = Math.abs(b - a) / 1000;
                int thoiGianLamBai = boCauHoiDaLam.getDeThi().getThoiGianLamBai();
                this.thoiGianLamBai = thoiGianLamBai - thoiGianDaSuDung;
            }
        } catch (Exception e) {
        }

    }
}
