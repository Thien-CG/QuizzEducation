package com.vnpt.quizz_education_be.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TaiKhoanJWT {
    @Id
    public String tenDangNhap;
    public String matKhau;
    public boolean trangThai;
    public String tenVaiTro;
}
