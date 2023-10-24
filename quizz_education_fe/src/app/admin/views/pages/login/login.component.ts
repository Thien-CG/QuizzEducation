import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpSvService } from '../../../../service/API.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private httpSvService : HttpSvService,
  ) {}

  public formLogin = this.formBuilder.group({
    tenDangNhap: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required]),
    remember: new FormControl(false, [Validators.required]),
  });

  
  public get getTenDangNhap() {
    return this.formLogin.get('tenDangNhap');
  }

  public get getMatKhau() {
    return this.formLogin.get('matKhau');
  }

  ngOnInit(): void {
    this.autoLogin();
   
  }

  public autoLogin() {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    if (token || !helper.isTokenExpired(token)) {
      let validateToken = this.httpClient.post<string>('http://localhost:8080/quizzeducation/api/validatetoken', { 'token': token });
      validateToken.subscribe(response => {
        if (response) {
          this.router.navigate(['/user/home']);
        }
      });
    }
  }

  public data="";
  public loginMethod() {
   if (this.formLogin.valid) {
      const API_LOGIN = 'http://localhost:8080/quizzeducation/api/login';

      // console.log(typeof this.formLogin.value.remember);
      const request = this.httpClient.post<any>(API_LOGIN,this.formLogin.value);
      request.subscribe((response) => {
        // Khi token không phải mã 191003 có nghĩ nó không fail đăng nhập
        if (response.token != '191003') {
          const helper = new JwtHelperService();
          localStorage.setItem('token', response.token);
          const data = JSON.parse(helper.decodeToken(response.token).sub);
          // Chuyển hướng đến trang chính hoặc làm bất kỳ điều gì cần thiết.
          if(data.vaiTro.tenVaiTro === 'Học sinh'){
              this.router.navigate(['user/home'])
          } else if(data.vaiTro.tenVaiTro === 'Giáo viên'){
            this.router.navigate(['teacher'])
          } else if(data.vaiTro.tenVaiTro === 'Admin'){
            this.router.navigate(['admin'])
          }  
          alert("Bạn đã đăng nhập thành công!")
        }else{alert("Uiss bạn ơi, tài khoản hoặc mật khẩu không đúng rùi?");}
        
        
      },
        (error) => {
          console.error(error);
          alert("Uiss bạn ơi, tài khoản hoặc mật khẩu không đúng rùi?");
        })

    }
  }

}
