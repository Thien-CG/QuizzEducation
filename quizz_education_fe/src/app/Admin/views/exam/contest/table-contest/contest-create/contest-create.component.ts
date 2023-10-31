import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.scss']
})
export class ContestCreateComponent implements OnInit {
  constructor(private renderer: Renderer2, private http: HttpClient,private httpService: HttpSvService) { }

  ngOnInit(): void {
    this.getTokenFromLocalStorage();
  }

  name: string = '';
  formattedStartTime: string = '';
  formattedEndTime: string = '';
  errorMessage: string | null = null;

  onSubmitCreate() {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (this.name == "") {
      this.errorMessage = 'Không được để trống tên kì thi';
      return
    }
    if (this.formattedEndTime == "" || this.formattedEndTime == "") {
      this.errorMessage = 'Không được để trống thời gian';
      return
    }
    if (!dateTimeRegex.test(this.formattedStartTime) || !dateTimeRegex.test(this.formattedEndTime)) {
      this.errorMessage = 'Ngày giờ không hợp lệ';
      return;
    }
    const startTime = new Date(this.formattedStartTime).getTime();
    const endTime = new Date(this.formattedEndTime).getTime();

    if (startTime >= endTime) {
      this.errorMessage = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
      return;
    }
    this.errorMessage = null;

    // Định dạng lại thời gian sử dụng moment
    const formattedStartTime = moment(this.formattedStartTime).format("YYYY-MM-DD HH:mm:ss.S");
    const formattedEndTime = moment(this.formattedEndTime).format("YYYY-MM-DD HH:mm:ss.S");

    const data = {
      tenKyThi: this.name,
      thoiGianBatDau: formattedStartTime, // Sử dụng thời gian đã định dạng
      thoiGianKetThuc: formattedEndTime, // Sử dụng thời gian đã định dạng
      daDienRa: true,
      taiKhoan: {
        tenDangNhap: this.username,
      },
    };

    const apiUrl = `http://localhost:8080/quizzeducation/api/kythi`;
    this.http.post(apiUrl, data)
      .subscribe((response: any) => {
        console.log('Dữ liệu đã được gửi thành công:', response);
        window.location.reload();
      }, (error: any) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });


  }
  onSubmitNew() {
    this.name = '';
    this.formattedStartTime = '';
    this.formattedEndTime = '';
    this.errorMessage = null;
  }


  // Lấy dữ liệu người dùng từ Local Storage
  user: any;
  username: any;
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
          this.httpService.getItem('taikhoan', this.user.tenDangNhap).subscribe((userData) => {
            this.user = userData;
            this.username = this.user.tenDangNhap
            // console.log(this.username);
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
}
