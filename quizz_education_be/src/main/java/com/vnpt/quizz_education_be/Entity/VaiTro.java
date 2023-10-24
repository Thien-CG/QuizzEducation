package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
