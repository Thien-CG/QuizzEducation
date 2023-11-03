import { VaiTro } from './VaiTro.entity';
import { LopThi } from './LopThi.entity';
export interface TaiKhoan {
  tenDangNhap: string;
  matKhau: string;
  trangThai: boolean;
  email: string;
  canCuocCongDan: string;
  hoVaTen: string;
  gioiTinh: string;
  ngaySinh: string;
  diaChi: string;
  soDienThoai: string;
  ngayTaoTaiKhoan: Date;
  anhDaiDien: string;
  lopThi: LopThi;
  vaiTro: VaiTro;

  
  
}
