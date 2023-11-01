import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as QRCode from 'qrcode';
import { NavbarComponent } from 'src/app/User/sharepages/navbar/navbar.component';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.scss']
})
export class TeacherHeaderComponent extends HeaderComponent{
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private router: Router,
    private httpSvService: HttpSvService,
    private fireStorage: AngularFireStorage,
  ) {
    super();
  }

  
  public user: any;
  ngOnInit(): void {
    this.getTokenFromLocalStorage();

    // Dữ liệu bạn muốn biến thành mã QR
    this.qrCodeData = `${this.user.canCuocCongDan}|${this.user.hoVaTen}|${this.user.soDienThoai}|${this.user.email}|${this.user.diaChi}|`;

    // Tạo hình ảnh QR
    this.generateQRCode();
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


  // Xóa dữ liệu người dùng khỏi Local Storage
  logout() {
    localStorage.removeItem('token'); // Xóa token từ localStorage
    this.router.navigate(['/login']); // Chuyển hướng người dùng đến trang đăng nhập
    this.user.token = ""
    this.httpSvService.putItem('taikhoan',this.user.tenDangNhap,this.user).subscribe(
      (response) => {
        console.log('Cập nhật token thành công',response);
        
      },
      (error) => {
        console.log('Lỗi Cập nhật mật khẩu', error);
      }
    );
  }
  //-------------------------------------------------------- MAIN--------------------------------------------------------------------------------------

  // Nếu chưa có ảnh thì set ảnh default
  defaultImage: string = 'https://firebasestorage.googleapis.com/v0/b/quizzeducation-eaea3.appspot.com/o/images%2Fdefault-user.png?alt=media&token=9242ab38-66aa-4764-a726-bceb152ff1e4';

//Đổi ảnh
selectedImage: File | undefined;
openFileInput() {
  // Mở cửa sổ chọn tệp bằng cách kích hoạt input[type="file"]
  document.getElementById('fileInput')?.click();
}

  showSettings = false;

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  openChangeImage() {
    document.getElementById("changeImage").click();
  }

  async saveNewProfilePic(event: any) {
    var file = event.target.files[0]
    if (file.type.match(/image\/*/) && file.size <= 6000000) {
      const randomNumberString = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
      const path = `${randomNumberString}`
      const upload = await this.fireStorage.upload(path, file)
      const url = await upload.ref.getDownloadURL()
      console.log(url)
      this.user.anhDaiDien = url;
      this.httpSvService
        .putItem('taikhoan', this.user.tenDangNhap, this.user)
        .subscribe(
          (response) => {
            console.log('Ok con dê');
            console.log(this.user.anhDaiDien);
          },
          (error) => {
            console.log('Lỗi Cập nhật', error);
          }
        );
    } else {
      alert("Tour chỉ nhận ảnh từ 5MB trở xuống")
    }
  }

  deleteImage(url: string) {
    this.fireStorage.storage.refFromURL(url).delete()
  }



  // Tạo QR cho tài khoản
  public qrCodeData: string = ''; // Dữ liệu mã QR
  public qrCodeImage: string = ''; // Đường dẫn hình ảnh mã QR
  generateQRCode() {
    const qrCodeOptions = {
      type: 'image/jpeg', // Loại hình ảnh (có thể là 'image/jpeg', 'image/png', vv.)
      quality: 0.92, // Chất lượng hình ảnh
      margin: 1, // Độ rộng của viền (1 là mặc định)
      color: {
        dark: '#000000', // Màu sắc cho mã QR
        light: '#ffffff' // Màu sắc cho phần nền
      }
    };

    // Tạo hình ảnh QR
    QRCode.toDataURL(this.qrCodeData, qrCodeOptions, (error, url) => {
      if (error) {
        console.error('Lỗi khi tạo hình ảnh QR:', error);
      } else {
        this.qrCodeImage = url;
      }
    });
  }
}
