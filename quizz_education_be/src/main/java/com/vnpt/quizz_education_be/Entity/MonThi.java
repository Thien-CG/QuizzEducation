package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Monthi")
public class MonThi implements Serializable {

    @Id
    @Column(name = "ma_mon")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maMon;

    @Column(name = "ten_mon")
    private String tenMon;

}
