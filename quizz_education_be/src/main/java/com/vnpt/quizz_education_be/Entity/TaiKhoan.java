package com.vnpt.quizz_education_be.Entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Taikhoan")
public class TaiKhoan implements Serializable {
    @Id
    @Column(name = "ten_dang_nhap")
    private String tenDangNhap;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "trang_thai")
    private Boolean trangThai;

    @Column(name = "email")
    private String email;

    @Column(name = "can_cuoc_cong_dan")
    private String canCuocCongDan;

    @Column(name = "ho_va_ten")
    private String hoVaTen;

    @Column(name = "gioi_tinh")
    private Boolean gioiTinh;

    @Column(name = "ngay_sinh")
    private Date ngaySinh;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "so_dien_thoai")
    private String soDienThoai;

    @Column(name = "ngay_tao_tai_khoan")
    private Date ngayTaoTaiKhoan;

    @Column(name = "anh_dai_dien")
    private String anhDaiDien;

    @Column(name = "token")
    private String token;

    @ManyToOne
    @JoinColumn(name = "ma_lop")
    LopThi lopThi;

    // Relationship 1-N

    @ManyToOne
    @JoinColumn(name = "ma_vai_tro")
    VaiTro vaiTro;
}
