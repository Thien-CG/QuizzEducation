package com.vnpt.quizz_education_be.DTO;

import java.io.Serializable;

import com.vnpt.quizz_education_be.Entity.BoCauHoiDaLam;
import com.vnpt.quizz_education_be.Entity.CauHoi;
import com.vnpt.quizz_education_be.Entity.DapAn;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThiResponeDTO implements Serializable {
    DapAn dapAn = null;

    boolean xoa = false;

    BoCauHoiDaLam boCauHoiDaLam;

    CauHoi cauHoi;

    boolean daNop = false;
}
