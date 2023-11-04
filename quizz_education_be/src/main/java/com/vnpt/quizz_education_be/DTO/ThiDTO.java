package com.vnpt.quizz_education_be.DTO;

import java.io.Serializable;

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
            if (boCauHoiDaLam.getThoiGianBatDau() == null || boCauHoiDaLam.getThoiGianKetThuc() == null) {
                this.thoiGianLamBai = boCauHoiDaLam.getDeThi().getThoiGianLamBai();
            } else {
                long a = boCauHoiDaLam.getThoiGianKetThuc().getTime();
                long b = boCauHoiDaLam.getThoiGianBatDau().getTime();
                long thoiGianDaSuDung = Math.abs(a - b) / 1000;
                int thoiGianLamBai = boCauHoiDaLam.getDeThi().getThoiGianLamBai();
                this.thoiGianLamBai = thoiGianLamBai - thoiGianDaSuDung;
            }
        } catch (Exception e) {

        }

    }
}
