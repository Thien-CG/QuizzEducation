import { examClass } from '../exam/exam-class'; // Import lớp LopThi từ file LopThi.ts

export interface accountStudent {
    tenDangNhap?: string;
    matKhau?: string;
    trangThai?: boolean;
    email?: string;
    canCuocCongDan?: string;
    hoVaTen: string;
    gioiTinh?: boolean;
    ngaySinh?: Date;
    diaChi?: string;
    soDienThoai?: string;
    ngayTaoTaiKhoan?: string;
    anhDaiDien: string;
    token: string;
    lopThi: examClass; // Sử dụng lớp LopThi trong interface này
}
