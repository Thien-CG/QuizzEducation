import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-contest-create',
  templateUrl: './contest-create.component.html',
  styleUrls: ['./contest-create.component.scss'],
  providers: [MessageService]
})
export class ContestCreateComponent implements OnInit {
  myFormKyThi: FormGroup;
  constructor(private messageService: MessageService,private renderer: Renderer2, private fb: FormBuilder, private http: HttpClient, private httpService: HttpSvService) {
    this.myFormKyThi = this.fb.group({
      tenKyThi: ['', [Validators.required]],
      thoiGianBatDau: ['', [Validators.required]],
      thoiGianKetThuc: ['', [Validators.required]]

    });
  }


  ngOnInit(): void {
    this.getTokenFromLocalStorage();
  }

  errorMessage: string;

  onSubmitCreate() {

    if (this.myFormKyThi.invalid) {
      for (const control in this.myFormKyThi.controls) {
        if (this.myFormKyThi.controls.hasOwnProperty(control)) {
          this.myFormKyThi.controls[control].markAsTouched();
        }
      }
      return;
    }


    const startTime = this.myFormKyThi.get('thoiGianBatDau').value;
    const endTime = this.myFormKyThi.get('thoiGianKetThuc').value;

    if (startTime >= endTime) {
      this.errorMessage = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc';
      return;
    }
    // Định dạng lại thời gian sử dụng moment

    const data = {
      tenKyThi: this.myFormKyThi.get('tenKyThi').value,
      thoiGianBatDau: this.myFormKyThi.get('thoiGianBatDau').value,
      thoiGianKetThuc: this.myFormKyThi.get('thoiGianKetThuc').value,
      daDienRa: true,
      taiKhoan: {
        tenDangNhap: this.username,
      },
    };

    this.httpService.postItem("kythi", data)
      .subscribe((response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
        window.location.reload();
      }, (error: any) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });


  }
  onSubmitNew() {
    this.myFormKyThi.reset();
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
