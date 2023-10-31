package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class DapAnDTO implements Serializable {
    private int maDapAn;

    private String noiDungDapAn;

    private Boolean dapAnDung;

    private Float diemDapAn;

    private boolean daChon;

    public DapAnDTO(DapAn dapAn, boolean daChon) {
        this.maDapAn = dapAn.getMaDapAn();
        this.noiDungDapAn = dapAn.getNoiDungDapAn();
        this.dapAnDung = dapAn.getDapAnDung();
        this.diemDapAn = dapAn.getDiemDapAn();
        this.daChon = daChon;
    }
}
