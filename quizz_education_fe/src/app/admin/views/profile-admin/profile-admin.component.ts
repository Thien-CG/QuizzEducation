import { JwtHelperService } from '@auth0/angular-jwt';

import { Component, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.scss'],
  providers: [MessageService]
})
export class ProfileAdminComponent {


  myForm: FormGroup; // Khai báo FormGroup
  // Nếu chưa có ảnh thì set ảnh default
  defaultImage: string = 'https://firebasestorage.googleapis.com/v0/b/quizzeducation-eaea3.appspot.com/o/images%2Fdefault-user.png?alt=media&token=9242ab38-66aa-4764-a726-bceb152ff1e4';
  
    constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
      private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService, private fireStorage: AngularFireStorage,) {
  
        
      // Sửa tài khoản thông tin học sinh
  
      function birthDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const birthDate = new Date(control.value); // Chuyển giá trị ngày sinh sang đối tượng Date
        const currentDate = new Date(); // Lấy ngày hiện tại
  
        if (birthDate > currentDate) {
          return { 'invalidBirthDate': true }; // Trả về lỗi nếu ngày sinh lớn hơn ngày hiện tại
        }
  
        return null; // Không có lỗi
      }
  
      // Khởi tạo FormGroup và các FormControl
      this.myForm = this.fb.group({
        tenDangNhap: [''],
        matKhau: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]], // Ví dụ: Mật khẩu yêu cầu ít nhất 8 ký tự
        tenHocSinh: ['', [Validators.required]],
        gioiTinh: ['', [Validators.required]],
        diaChi: ['', [Validators.required]],
        canCuocCongDan: ['', [Validators.required]],
        soDienThoai: ['', [Validators.required]],
        ngaySinh: ['', [Validators.required, birthDateValidator]],
        email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
        trangThai: [''],
        anhDaiDien: [''],
      });
  
    }
  
    //Sửa lại chổ tìm kiếm trong thư viện
    public getValueSearch() {
      return this.formFilter.get('search')?.value;
    }
  
    public formFilter = this.formBuilder.group({
      setRows: new FormControl(5),
      search: new FormControl('')
    })

    public user : any[];
    listItemStudent: any;
    username: string;
    ngOnInit(): void {
      this.getTokenFromLocalStorage();
      this.FillInFrom();
      // Dữ liệu bạn muốn biến thành mã QR
    this.qrCodeData = `${this.listItemStudent.canCuocCongDan}|${this.listItemStudent.hoVaTen}|${this.listItemStudent.soDienThoai}|${this.listItemStudent.gioiTinh ? 'Nam' : 'Nữ'}|${this.listItemStudent.email}|${this.listItemStudent.diaChi}|`;

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
        this.listItemStudent = JSON.parse(decodedToken.sub);
         
        //Đi tìm trong DB lấy ra đối tượng
        this.httpService.getItem('taikhoan',this.listItemStudent.tenDangNhap).subscribe((userData) => {
          this.listItemStudent = userData;
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
   
  
    
   
   
    FillInFrom() {
      this.httpService.getItem('taikhoan', this.listItemStudent.tenDangNhap).subscribe(response => {
        
        this.listItemStudent = response;
        const ngaySinhDate = new Date(this.listItemStudent.ngaySinh);
        this.myForm.get('tenDangNhap').setValue(this.listItemStudent.tenDangNhap);
        this.myForm.get('matKhau').setValue(this.listItemStudent.matKhau);
        this.myForm.get('email').setValue(this.listItemStudent.email);
        this.myForm.get('tenHocSinh').setValue(this.listItemStudent.hoVaTen);
        this.myForm.get('canCuocCongDan').setValue(this.listItemStudent.canCuocCongDan);
        this.myForm.get('gioiTinh').setValue(this.listItemStudent.gioiTinh);
        this.myForm.get('trangThai').setValue(this.listItemStudent.trangThai);
        this.myForm.get('diaChi').setValue(this.listItemStudent.diaChi);
        this.myForm.get('ngaySinh').setValue(ngaySinhDate);
        this.myForm.get('soDienThoai').setValue(this.listItemStudent.soDienThoai);
        this.myForm.get('anhDaiDien').setValue(this.listItemStudent.anhDaiDien);
      })
    }
  
    // update tài khoản học sinh 
    updateUser() {
      const data = {
        tenDangNhap: this.myForm.get('tenDangNhap').value,
        matKhau: this.myForm.get('matKhau').value,
        hoVaTen: this.myForm.get('tenHocSinh').value,
        gioiTinh: this.myForm.get('gioiTinh').value,
        diaChi: this.myForm.get('diaChi').value,
        soDienThoai: this.myForm.get('soDienThoai').value,
        canCuocCongDan: this.myForm.get('canCuocCongDan').value,
        ngaySinh: this.myForm.get('ngaySinh').value,
        email: this.myForm.get('email').value,
        trangThai: this.myForm.get('trangThai').value,
        anhDaiDien:this.myForm.get('anhDaiDien').value,
        ngayTaoTaiKhoan: this.listItemStudent.ngayTaoTaiKhoan,
        vaiTro: {
          maVaiTro: '3'
        }
      }
      this.httpService.putItem('taikhoan', this.listItemStudent.tenDangNhap, data).subscribe(response => {
  
        this.showSussce();
        setTimeout(() => {
          location.reload();
        }, 2000);
      }, (error) => {
        this.showError()
        console.log(error);
      })
    }
  
    showSussce() {
      this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Cập nhật tài khoản admin thành công!' });
    }
    showError() {
      this.messageService.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Uiss lỗi cập nhật rùi!' });
    }
  
  
    // select them cột trên bảng
    selectedNodes: any;
    gioiTinh: any[] = [
      { label: 'Nam', value: 'true' },
      { label: 'Nữ', value: 'false' }
    ];
  
    trangThai: any[] = [
      { label: 'Còn hoạt động', value: 'true' },
      { label: 'Ngừng hoạt động', value: 'false' }
    ];
   
    lopThi: any[] = [];
    listLopThi: any;
  
  
    maskPassword(password: string): string {
      const maskedPassword = password.split('').map(() => '*').join('');
      return maskedPassword;
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
      this.listItemStudent.anhDaiDien = url;
      this.httpService
        .putItem('taikhoan', this.listItemStudent.tenDangNhap, this.listItemStudent)
        .subscribe(
          (response) => {
            console.log('Đổi ảnh profileAdmin ok nhé');
            console.log(this.listItemStudent.anhDaiDien);
          },
          (error) => {
            console.log('Lỗi Cập nhật', error);
          }
        );
    } else {
      alert("Chỉ nhận ảnh từ 5MB trở xuống")
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
