import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(
    private router: Router,
    private httpSvService : HttpSvService,
    private formBuilder: FormBuilder,
  ) { }

  public formChangePass = this.formBuilder.group({
    
    tenDangNhap: new FormControl('', [Validators.required]),
    matKhauMoi: new FormControl('', [Validators.required]),
  });


  public get getMatKhauMoi() {
    return this.formChangePass.get('matKhauMoi');
  }

  public get getTenDangNhap() {
    return this.formChangePass.get('tenDangNhap');
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
  public user : any;
  ngOnInit(): void {
    this.getTokenFromLocalStorage();
   
    }

    public checkTaiKhoan() {
     
      const matKhauMoiForm = this.formChangePass.value.matKhauMoi;
   
    }
    
    
    

    public updatePassWord() {
      if (this.formChangePass.valid) {
        this.user.matKhau = this.formChangePass.value.matKhauMoi
        this.httpSvService.putItem('taikhoan', this.user.tenDangNhap, this.user).subscribe(
          (response) => {
            console.log("Ok con dê");
            console.log(this.user)
          },
          (error) => {
            console.log("Lỗi Cập nhật", error);
          }
        );
       
   
       }
     }
     moveToNextInput(event: any, nextInputId: string) {
      const input = event.target;
      if (input.value.length >= input.maxLength) {
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
}
