package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Lopthi")
public class LopThi implements Serializable {

    @Id
    @Column(name = "ma_lop")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maLopThi;

    @Column(name = "ten_lop")
    private String tenLop;

    @Column(name = "so_luong_toi_da")
    private int soLuongToiDa;

    @JsonIgnore
    @OneToMany(mappedBy = "lopThi")
    List<TaiKhoan> List_TK;
}
