package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Lichsuthi")
public class LichSuThi implements Serializable {

  @Id
  @Column(name = "ma_lich_su_thi")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int maLichSuThi;

  // Relationship N - 1

  @ManyToOne
  @JoinColumn(name = "ma_bo_cau_hoi_da_lam")
  BoCauHoiDaLam boCauHoiDaLam;

  @ManyToOne
  @JoinColumn(name = "ma_dap_an_da_chon")
  DapAn dapAn;

}
