import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private httpSvService: HttpSvService,
    private formBuilder: FormBuilder
  ) {}

  public formForgot = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      ,
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ]),
    matKhauMoi: new FormControl('', [Validators.required]),
  });

  public get getMatKhauMoi() {
    return this.formForgot.get('matKhauMoi');
  }

  public get getEmail() {
    return this.formForgot.get('emai');
  }

  public user: any;
  public listUser: any;
  public getUserData() {
    this.httpSvService.getList('taikhoan').subscribe((response) => {
      this.listUser = response;
    });
  }
  ngOnInit(): void {
    this.getUserData();
  }

  public checkTaiKhoan() {
    const emailForm = this.formForgot.value.email;
    const matKhauMoiForm = this.formForgot.value.matKhauMoi;

    console.log(emailForm);
    console.log(matKhauMoiForm);

    // Tìm tài khoản có email tương ứng trong listUser
    const matchedUser = this.listUser.find((user) => user.email === emailForm);
    this.user = matchedUser;
    if (matchedUser) {
      // Email khớp, matchedUser chứa dữ liệu tài khoản tương ứng
      console.log('Tài khoản đã tìm thấy:', matchedUser);
      this.sendEmail();
      // Thực hiện xử lý tài khoản ở đây (ví dụ: cập nhật mật khẩu)
    } else {
      // Email không khớp
      console.log('Tài khoản không tồn tại.');
    }
    console.log(this.user);
  }

  public updatePassWord() {
    if (this.formForgot.valid) {
      this.user.matKhau = this.formForgot.value.matKhauMoi;
      this.httpSvService
        .putItem('taikhoan', this.user.tenDangNhap, this.user)
        .subscribe(
          (response) => {
            console.log('Ok con dê');
            console.log(this.user);
          },
          (error) => {
            console.log('Lỗi Cập nhật', error);
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

  //Send-email
  public formOTP = this.formBuilder.group({
    otp1: new FormControl('', [Validators.required]),
    otp2: new FormControl('', [Validators.required]),
    otp3: new FormControl('', [Validators.required]),
    otp4: new FormControl('', [Validators.required]),
  });

  public get getOtp1() {
    return this.formOTP.get('otp1');
  }
  public get getOtp2() {
    return this.formOTP.get('otp2');
  }
  public get getOtp3() {
    return this.formOTP.get('otp3');
  }
  public get getOtp4() {
    return this.formOTP.get('otp4');
  }

  //OTP xác nhận email

  sentOTP: string; //mã có thời gian
  randomOTP: string;
  userOTP: boolean = false;

  generateOtp(length: number): string {
    // Tạo mã OTP với chiều dài cho trước
    const charset = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }

    // Lấy thời gian hiện tại (timestamp) và cộng thêm 60 giây (60 * 1000 milliseconds) để tạo timestamp hết hạn
    const currentTimestamp = new Date().getTime();
    const expirationTimestamp = currentTimestamp + 60 * 1000; // 60 giây

    // Kết hợp mã OTP và timestamp
    const otpWithTimestamp = `${otp}-${expirationTimestamp}`;

    return otpWithTimestamp;
  }

  //check OTP có hợp lý không
  public confirmOTP() {
    const codeOTP =
      this.formOTP.value.otp1 +
      this.formOTP.value.otp2 +
      this.formOTP.value.otp3 +
      this.formOTP.value.otp4;
    this.userOTP = this.verifyOtp(codeOTP);
    if (this.userOTP === true) {
      // Mã OTP đúng
      // Thực hiện các hành động sau khi xác nhận thành công
      console.log('Mã OTP chính xác!');
      this.updatePassWord();
      alert("Bạn đã lấy lại mật khẩu thành công!");  
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    } else {
      // Mã OTP không khớp
      alert('Mã OTP không đúng hoặc hết hiệu lực. Vui lòng thử lại!.');
    }
  }

  //tách mã otp vs thời gian hiệu lực ra
  verifyOtp(userEnteredOTP: string): boolean {
    // Tách mã OTP và timestamp từ chuỗi mã OTP
    const parts = this.sentOTP.split('-');
    if (parts.length === 2) {
      const generatedOTP = parts[0];
      const expirationTimestamp = parseInt(parts[1], 10);
      this.randomOTP = generatedOTP;
      // Lấy thời gian hiện tại
      const currentTimestamp = new Date().getTime();

      // Kiểm tra xem thời gian hiện tại có nhỏ hơn thời gian hết hạn của mã OTP không
      if (currentTimestamp <= expirationTimestamp) {
        // Kiểm tra xem mã OTP mà người dùng nhập có trùng khớp với mã OTP tự sinh không
        if (userEnteredOTP === generatedOTP) {
          return true; // Mã OTP hợp lệ và chưa hết hạn
        }
      }
    }

    return false; // Mã OTP không hợp lệ hoặc đã hết hạn
  }

  emailData = {
    from: 'Quizz Education <quizzeducation@tpl.edu.vn>',
    to: '',
    subject: 'Quên Mật Khẩu',
    text: '',
  };
  // Hàm hỗ trợ thêm số 0 nếu cần
  addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
  sendEmail() {
    this.sentOTP = this.generateOtp(4); //bao gồm mã và thời gian hiệu lực otp
    const parts = this.sentOTP.split('-'); //tách mã vs thời gian ra
    if (parts.length === 2) {
      const generatedOTP = parts[0]; // mã otp
      const expirationTimestamp = parseInt(parts[1], 10); //thời gian hiệu lực
      this.randomOTP = generatedOTP; //gán để fill lên html
    }
    this.emailData.to = this.user.email;

    // Lấy thời gian hiện tại, chỉ để hiển thị lên textEmail của html
    const now = new Date();
    const expirationTime = new Date(now.getTime() + 60 * 1000); // Thời gian hết hạn sau 60s (60 giây * 1000 milliseconds)

    console.log(this.randomOTP);

    this.emailData.text = `
<div class="container" style="max-width: 600px;
margin: 0 auto;
padding: 20px;">
    <div class="header" style="background-color: #001248;
    color: #ff008d;
    text-align: center;
    padding: 20px;">
        <h1>QUIZZ EDUCATION</h1>
        <img width="30%"src="https://firebasestorage.googleapis.com/v0/b/quizzeducation-eaea3.appspot.com/o/images%2FQE.png?alt=media&token=cfa1bca5-80f0-4b73-8058-f1e363660c4c">
    </div></br>
    <div class="content" style="background-color: #e5e4e4;padding: 20px;">
        </br><p>Xin chào, ${this.user.hoVaTen}</p>
        </br><p>Chúng tôi đã nhận được yêu cầu xác minh địa chỉ email của bạn.</p>
        </br><p>Mã OTP đã được gửi đến email của bạn.</p>
        </br><p class="code" style="font-size: 24px;font-weight: bold;color: #007bff;text-align: center; margin: auto; border-radius: 10px; padding: 10px;letter-spacing: 15px;font-size: 30px;">${
          this.randomOTP
        }</p>
        </br><p>Mã OTP này có hiệu lực trong vòng 60 giây.</p>
        </br><p>Thời gian bắt đầu từ: ${this.addLeadingZero(
          now.getHours()
        )}:${this.addLeadingZero(now.getMinutes())}:${this.addLeadingZero(
      now.getSeconds()
    )} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}</p>
        </br><p>Thời gian hết hạn: ${this.addLeadingZero(
          expirationTime.getHours()
        )}:${this.addLeadingZero(
      expirationTime.getMinutes()
    )}:${this.addLeadingZero(
      expirationTime.getSeconds()
    )} ${expirationTime.getDate()}/${
      expirationTime.getMonth() + 1
    }/${expirationTime.getFullYear()}</p>
        </br><p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua thông báo này.</p>
        </br><p>Không chuyển tiếp hoặc cung cấp mã này cho bất kỳ ai.</p>
        </br><div class="instructions">
            <p>Trân trọng,</p>
            <p>Quizz Education</p>
            <p>Email này không thể nhận phản hồi.</p>
        </div>
    </div>
</div>
`;

    console.log(this.emailData);
    this.httpSvService.postItem('send-email', this.emailData).subscribe(
      (response) => {
        console.log('Email sent successfully.');
      },
      (error) => {
        console.error('Failed to send email: ', error);
      }
    );
    // Tạo một subscription để cập nhật thời gian đếm ngược sau mỗi giây
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--; // Giảm thời gian đếm ngược đi 1 giây
      }
    });
  }

  //Đếm ngược 60s
  countdown: number = 60; // Thời gian đếm ngược ban đầu là 60 giây
  countdownSubscription: Subscription;

  ngOnDestroy() {
    // Hủy đăng ký khi component bị hủy
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
