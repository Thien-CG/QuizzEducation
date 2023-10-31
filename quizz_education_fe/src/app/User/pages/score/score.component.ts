import { FormatService } from './../../../service/Format.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpSvService } from 'src/app/service/API.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  constructor(
    private router: Router,
    private httpSvService : HttpSvService,
    private format : FormatService,
  ){}

  ngOnInit(): void {
    this.getTokenFromLocalStorage();
    this.getData();
    }

  public user : any;
 // Lấy dữ liệu người dùng từ Local Storage
 public getTokenFromLocalStorage(): any {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  if (token) {
    const helper = new JwtHelperService();
    try {
      const decodedToken = helper.decodeToken(token);
      // Trích xuất dữ liệu từ trường 'sub'
     
    if (decodedToken.sub) {
      
      // Lấy dữ liệu từ Local Storage và gán cho biến user
      this.user = JSON.parse(decodedToken.sub);
       
      //Đi tìm trong DB lấy ra đối tượng
      this.httpSvService.getItem('taikhoan',this.user.tenDangNhap).subscribe((userData) => {
        this.user = userData;
       });
    }
    
      return decodedToken; // Trả về đối tượng JSON
    } catch (error) {
      console.error('Lỗi giải mã token:', error);
      return null;
    }
  }
  return null; // Không tìm thấy token trong localStorage
}
 //Khai báo các biến ở đây
    ListDiemThi: any;
   //Lấy data về từ API
   public getData() {
    this.httpSvService.getList(`bangdiem/${this.user.tenDangNhap}`).subscribe(response => {
      this.ListDiemThi = response;
      console.log(this.ListDiemThi);
     
    })
  }

  getBadgeClass(trangThai: string): string {
    if (trangThai === 'Đạt') {
      return 'text-green';
    } else if (trangThai === 'Chưa đạt') {
      return 'text-red';
    }
    return ''; // Hoặc lớp mặc định nếu không khớp
  }

  exportExcel() {
    // Biến đổi dữ liệu từ this.ListMaterial thành một mảng mới chứa chỉ những thuộc tính bạn quan tâm
    const dataForExcel = this.ListDiemThi.map(diemthi => ({
      'Tên kỳ thi': diemthi.tenKyThi,
      'Môn thi':  diemthi.tenMon,
      'Lớp thi':  diemthi.lopThi,
      'Điểm thi':  diemthi.diemSo,
      'Trạng thái':  diemthi.trangThai,
    
    }));
  
    // Tạo một WorkSheet từ mảng biến đổi
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);
  
    // Tạo một WorkBook và thêm WorkSheet vào đó
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'DiemThi');
  
    // Xuất file Excel
    XLSX.writeFile(wb, 'danh-sach-diem-thi_'+this.user.hoVaTen+'.xlsx');
  }
 

}
