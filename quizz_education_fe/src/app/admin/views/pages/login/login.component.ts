import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  public formLogin = this.formBuilder.group({
    tenDangNhap: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required]),
    // remember: new FormControl(false, [Validators.required]),
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
          this.router.navigate(['#/user/home']);
        }
      });
    }
  }

  public loginMethod() {
    if (this.formLogin.valid) {
      const API_LOGIN = 'http://localhost:8080/quizzeducation/api/login';

      const request = this.httpClient.post<any>(API_LOGIN,this.formLogin.value);
      request.subscribe((response) => {
        // Khi token không phải mã 191003 có nghĩ nó không fail đăng nhập
        if (response.token != '191003') {
          const helper = new JwtHelperService();
          localStorage.setItem('token', response.token);
          const data = JSON.parse(helper.decodeToken(response.token).sub);

          if(data) {
            // Lưu thông tin người dùng vào localStorage hoặc biến trạng thái ứng dụng.
            localStorage.setItem('userData', JSON.stringify(data));

            // Chuyển hướng đến trang chính hoặc làm bất kỳ điều gì cần thiết.
          this.router.navigate(['/user/home']);
          }
        }
        

      },
        (error) => {
          console.error(error);
        })

    }
  }

}
