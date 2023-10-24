import { LoginComponent } from './../../../Teacher/views/pages/login/login.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpSvService } from 'src/app/service/API.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private httpSvService: HttpSvService,
    private fireStorage: AngularFireStorage,
  ) { }

  public user: any;
  ngOnInit(): void {
    this.getTokenFromLocalStorage();
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
  }
  //-------------------------------------------------------- MAIN--------------------------------------------------------------------------------------

  // Nếu chưa có ảnh thì set ảnh default
  defaultImage: string = 'https://firebasestorage.googleapis.com/v0/b/quizzeducation-eaea3.appspot.com/o/images%2Fdefault-user.png?alt=media&token=9242ab38-66aa-4764-a726-bceb152ff1e4';

  // Hàm tính tuổi từ ngày tháng năm sinh
  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Kiểm tra xem ngày sinh trong năm hiện tại chưa đến
    const isBirthdayPassed = (
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() >= birthDate.getDate())
    );

    // Trừ đi 1 nếu chưa đến ngày sinh trong năm hiện tại
    if (!isBirthdayPassed) {
      return age - 1;
    } else {
      return age;
    }
  }

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
    } else {
      alert("Tour chỉ nhận ảnh từ 5MB trở xuống")
    }
  }

  deleteImage(url: string) {
    this.fireStorage.storage.refFromURL(url).delete()
  }
}
