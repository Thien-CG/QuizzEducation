import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpSvService } from '../../../../../service/API.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})

export class CreateTeacherComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup

  constructor(private fb: FormBuilder, private httpService: HttpSvService, private http: HttpClient, private messageService: MessageService) {

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
      tenDangNhap: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9_]+$/), Validators.maxLength(20)]], // Ví dụ: Tên đăng nhập yêu cầu ít nhất 6 ký tự
      matKhau: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]], // Ví dụ: Mật khẩu yêu cầu ít nhất 8 ký tự
      tenHocSinh: ['', [Validators.required]],
      gioiTinh: ['', [Validators.required]],
      diaChi: ['', [Validators.required]],
      canCuocCongDan: ['', [Validators.required]],
      soDienThoai: ['', [Validators.required]],
      namSinh: ['', [Validators.required, birthDateValidator]],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      selectedLopThi: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.myForm.invalid) {
      for (const control in this.myForm.controls) {
        if (this.myForm.controls.hasOwnProperty(control)) {
          this.myForm.controls[control].markAsTouched();
        }
      }
      return;

    }

    const tenDN = this.myForm.get('tenDangNhap').value
    this.checkIfMonThiIsReferenced(tenDN);
  }

  resetForm() {
    this.myForm.reset();
  }

  checkIfMonThiIsReferenced(tenDangNhap: string) {
    this.httpService.getItem('taikhoan', tenDangNhap).subscribe(
      (response) => {
        this.showError()
      },
      (error) => {
        if (error.status === 404 || error.status === 204) {
          this.create()
        } else {
          console.log("Lỗi trong quá trình kiểm tra tên đăng nhập", error);
        }
      }
    );
  }

  lopThiOptions!: any[];
  lopThiList: any;
  taiKhoanList: any;
  selectedLopThi: any;

  // Trong component của bạn
  ngOnInit() {
    // Gọi API để lấy danh sách tài khoản
    this.httpService.getList('taikhoan/giaovien').subscribe(response => {
      this.taiKhoanList = response;
      this.initializeLopOptions();
    });

    // Gọi API để lấy danh sách lớp
    this.httpService.getList('lopthi').subscribe(response => {
      this.lopThiList = response;
      this.initializeLopOptions();
    });
  }

  initializeLopOptions() {
    if (this.taiKhoanList && this.lopThiList) {
      // Lọc lớp chưa có trong danh sách tài khoản
      this.lopThiOptions = this.lopThiList.filter(lop => {
        return !this.taiKhoanList.some(taiKhoan => taiKhoan.lopThi && taiKhoan.lopThi.maLopThi === lop.maLopThi);
      }).map(lop => {
        return { label: lop.tenLop, value: lop.maLopThi };
      });
    }
  }

  // tạo học sinh mới 
  create() {
    const data = {
      tenDangNhap: this.myForm.get('tenDangNhap').value,
      matKhau: this.myForm.get('matKhau').value,
      trangThai: true,
      email: this.myForm.get('email').value,
      hoVaTen: this.myForm.get('tenHocSinh').value,
      gioiTinh: this.myForm.get('gioiTinh').value,
      canCuocCongDan: this.myForm.get('canCuocCongDan').value,
      diaChi: this.myForm.get('diaChi').value,
      ngaySinh: this.myForm.get('namSinh').value,
      soDienThoai: this.myForm.get('soDienThoai').value.toString().replace(/\s/g, ''),
      ngayTaoTaiKhoan: new Date(),
      vaiTro: {
        maVaiTro: 2,
      },
      lopThi: {
        maLopThi: this.myForm.get('selectedLopThi').value.value,
      }

    }
    this.httpService.postItem('taikhoan', data).subscribe(
      (response) => {
        this.showSussce()
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      (error) => {
        console.log('Lỗi tạo mới', error);
      }
    );
  

  }

  showSussce() {
    this.messageService.add({ severity: 'success', summary: 'Tạo thành công', detail: 'Tạo tài khoản thành công' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Tạo thất bại', detail: 'Tài khoản đã tồn tại !' });
  }
}



