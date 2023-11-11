package com.vnpt.quizz_education_be.DTO;

import java.io.Serializable;
import java.util.Date;

import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThiDTO implements Serializable {

    long thoiGianLamBai;

    BoCauHoiDaLam boCauHoiDaLam;

    boolean coTheThi = false;

    public ThiDTO(BoCauHoiDaLam boCauHoiDaLam) {
        this.boCauHoiDaLam = boCauHoiDaLam;

        try {
            Date date = new Date();
            Date dateExamEnd = boCauHoiDaLam.getDeThi().getChiTietKyThi().getThoiGianKetThuc();
            if (date.before(dateExamEnd)) {
                this.coTheThi = true;
            }
        } catch (Exception e) {
        }

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
