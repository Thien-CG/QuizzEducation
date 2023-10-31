import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpSvService } from 'src/app/service/API.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
}) 
export class HomeContentComponent {
    constructor(
      private router: Router,
      private httpSvService : HttpSvService,
    ){}
    
    public user : any;
    ngOnInit(): void {
      this.getTokenFromLocalStorage();
      this.getData();
      }
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
    ListLichThi: any;
  //Lấy data về từ API
  public getData() {
    this.httpSvService.getList(`lichthi/${this.user.tenDangNhap}`).subscribe(response => {
      this.ListLichThi = response;
      console.log(this.ListLichThi);
    })
  }
  getBadgeClass(trangThai: string): string {
    if (trangThai === 'Đang diễn ra') {
      return 'badge-green';
    }else if (trangThai === 'Chưa diễn ra') {
      return 'badge-orange';
    } else if (trangThai === 'Đã kết thúc') {
      return 'badge-red';
    }
    return ''; // Hoặc lớp mặc định nếu không khớp
  }
  
 // Chuyển đổi thời gian từ chuỗi sang đối tượng Date
convertToTime(thoiGian: string): string {
  const date = new Date(thoiGian);
  const hours = this.addLeadingZero(date.getHours());
  const minutes = this.addLeadingZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

// Hàm hỗ trợ thêm số 0 nếu cần
addLeadingZero(value: number): string {
  return value < 10 ? `0${value}` : value.toString();
}

}
