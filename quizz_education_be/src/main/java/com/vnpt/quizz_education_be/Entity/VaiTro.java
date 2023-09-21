package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Vaitro")
public class VaiTro implements Serializable {

    @Id
    @Column(name = "ma_vai_tro")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maVaiTro;

    @Column(name = "ten_vai_tro")
    private String tenVaiTro;

    @JsonIgnore
    @OneToMany(mappedBy = "vaiTro")
    List<TaiKhoan> List_TK;

}
