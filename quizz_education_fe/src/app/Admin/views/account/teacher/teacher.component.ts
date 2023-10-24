import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [MessageService]

})
export class TeacherComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup
  constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
    private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService) {

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
      selectedLopThi: ['', [Validators.required]],
      selectedDoiLopThi: ['', [Validators.required]],
      selectedMaLopThi: [''],
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


  listTeacher: any;
  ngOnInit(): void {
    this.getData();
    this.getDataLop();
  }

  //Lấy dử liệu về
  public getData() {
    this.httpService.getList('taikhoan/giaovien').subscribe(response => {
      this.listTeacher = response;
    })

  }

  // Ẩn mật khẩu
  maskPassword(password: string): string {
    const maskedPassword = password.split('').map(() => '*').join('');
    return maskedPassword;
  }

  // lấy username về để cập nhật
  ListItemTeacher: any;
  username: string;
  statusClass: number;
  selectedClass: any; // Lớp đã chọn
  availableClasses: any[]; // Danh sách các lớp khác
  editTeacher(username: string) {
    this.httpService.getItem('taikhoan', username).subscribe(response => {
      this.username = username;
      this.ListItemTeacher = response;
      this.statusClass = this.ListItemTeacher.lopThi
      const ngaySinhDate = new Date(this.ListItemTeacher.ngaySinh);

      this.myForm.get('tenDangNhap').setValue(this.ListItemTeacher.tenDangNhap);
      this.myForm.get('matKhau').setValue(this.ListItemTeacher.matKhau);
      this.myForm.get('email').setValue(this.ListItemTeacher.email);
      this.myForm.get('tenHocSinh').setValue(this.ListItemTeacher.hoVaTen);
      this.myForm.get('canCuocCongDan').setValue(this.ListItemTeacher.canCuocCongDan);
      this.myForm.get('gioiTinh').setValue(this.ListItemTeacher.gioiTinh);
      this.myForm.get('trangThai').setValue(this.ListItemTeacher.trangThai);
      this.myForm.get('diaChi').setValue(this.ListItemTeacher.diaChi);
      this.myForm.get('ngaySinh').setValue(ngaySinhDate);
      this.myForm.get('soDienThoai').setValue(this.ListItemTeacher.soDienThoai);
      if (this.ListItemTeacher.lopThi) {
        this.myForm.get('selectedLopThi').setValue(this.ListItemTeacher.lopThi.tenLop);
        this.myForm.get('selectedMaLopThi').setValue(this.ListItemTeacher.lopThi.maLopThi);
      } else {
        this.myForm.get('selectedLopThi').setValue("Chưa có lớp");
        this.myForm.get('selectedMaLopThi').setValue(null);
      }

    });
  }

  // Lọc theo select nam và nữ
  gioiTinh: any[] = [
    { label: 'Nam', value: 'true' },
    { label: 'Nữ', value: 'false' }
  ];

  // Lọc theo select trạng thái của tài khoản 
  trangThai: any[] = [
    { label: 'Còn hoạt động', value: 'true' },
    { label: 'Ngừng hoạt động', value: 'false' }
  ];

  // Lọc theo select lớp mà các giáo viên đảm nhiệm
  lopThi: any[] = [];
  listLopThi: any;

  // lấy dử liệu của lớp 
  getDataLop() {
    this.httpService.getList('lopthi').subscribe(response => {
      this.listLopThi = response;
      this.initializeLopThiOptions();
      this.initializeLopOptions()
    })
  }

  // tạo để select các lớp trên table
  initializeLopThiOptions() {
    // Kiểm tra nếu listLopThi đã được tải
    if (this.listLopThi) {
      this.lopThi = this.listLopThi.map(lop => {
        return { label: lop.tenLop, value: lop.maLopThi };
      });
    }
  }

  // tạo để chọn đổi lớp các mà các lớp chưa có giao viên quản lý
  lopThiOptions: any[] = [];
  initializeLopOptions() {
    if (this.listTeacher && this.listLopThi) {
      // Lọc lớp chưa có trong danh sách tài khoản
      this.lopThiOptions = this.listLopThi.filter(lop => {
        return !this.listTeacher.some(taiKhoan => taiKhoan.lopThi && taiKhoan.lopThi.maLopThi === lop.maLopThi);
      }).map(lop => {
        return { label: lop.tenLop, value: lop.maLopThi };
      });

    }
  }

  // cập nhật tài khoản của giáo viên 
  updataThongTin() {
    const selectedMaLopThi = this.myForm.get('selectedMaLopThi').value;
    const data = {
      tenDangNhap: this.username,
      matKhau: this.myForm.get('matKhau').value,
      trangThai: this.myForm.get('trangThai').value,
      email: this.myForm.get('email').value,
      canCuocCongDan: this.myForm.get('canCuocCongDan').value,
      hoVaTen: this.myForm.get('tenHocSinh').value,
      gioiTinh: this.myForm.get('gioiTinh').value,
      ngaySinh: this.myForm.get('ngaySinh').value,
      diaChi: this.myForm.get('diaChi').value,
      soDienThoai: this.myForm.get('soDienThoai').value,
      ngayTaoTaiKhoan: this.ListItemTeacher.ngayTaoTaiKhoan,
      lopThi: selectedMaLopThi !== null ? { maLopThi: selectedMaLopThi } : null,
      vaiTro: {
        maVaiTro: 2
      }
    }

    const classTonTai = this.myForm.get('selectedMaLopThi').value;
    const trangThai = this.myForm.get('trangThai').value;
    if (classTonTai != null && !trangThai) {
      this.showErrorStatus()
      return;
    }

    this.httpService.putItem('taikhoan', this.username, data).subscribe(response => {
      this.showSussce()
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
      error => {
        console.log('Lỗi không sát định', error)
        this.showError()
      });
  }

  // đổi lớp 
  changeClass() {

    const data = {
      tenDangNhap: this.username,
      matKhau: this.myForm.get('matKhau').value,
      trangThai: this.myForm.get('trangThai').value,
      email: this.myForm.get('email').value,
      canCuocCongDan: this.myForm.get('canCuocCongDan').value,
      hoVaTen: this.myForm.get('tenHocSinh').value,
      gioiTinh: this.myForm.get('gioiTinh').value,
      ngaySinh: this.myForm.get('ngaySinh').value,
      diaChi: this.myForm.get('diaChi').value,
      soDienThoai: this.myForm.get('soDienThoai').value,
      ngayTaoTaiKhoan: this.ListItemTeacher.ngayTaoTaiKhoan,
      lopThi: {
        maLopThi: this.myForm.get('selectedDoiLopThi').value.value
      },
      vaiTro: {
        maVaiTro: 2
      }
    }
      ;
    const trangThai = this.myForm.get('trangThai').value;
    if (!trangThai) {
      this.showErrorStatus2()
      return;
    }

    this.httpService.putItem('taikhoan', this.username, data).subscribe(response => {
      this.showSussce()
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
      error => {
        console.log('Lỗi không sát định', error)
        this.showError()
      });
  }

  // rời khỏi lớp
  exitClass() {

    const data = {
      tenDangNhap: this.username,
      matKhau: this.myForm.get('matKhau').value,
      trangThai: this.myForm.get('trangThai').value,
      email: this.myForm.get('email').value,
      canCuocCongDan: this.myForm.get('canCuocCongDan').value,
      hoVaTen: this.myForm.get('tenHocSinh').value,
      gioiTinh: this.myForm.get('gioiTinh').value,
      ngaySinh: this.myForm.get('ngaySinh').value,
      diaChi: this.myForm.get('diaChi').value,
      soDienThoai: this.myForm.get('soDienThoai').value,
      ngayTaoTaiKhoan: this.ListItemTeacher.ngayTaoTaiKhoan,
      lopThi: null,
      vaiTro: {
        maVaiTro: 2
      }
    };

    this.httpService.putItem('taikhoan', this.username, data).subscribe(response => {
      this.showClass()
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
      error => {
        console.log('Lỗi không sát định', error)
        this.showClassError()
      });
  }

  showClass() {
    this.messageService.add({ severity: 'success', summary: 'Thoát lớp thành công', detail: 'Giáo viên thoát lớp thành công' });
  }
  showClassError() {
    this.messageService.add({ severity: 'error', summary: 'Thoát lớp thất bại', detail: 'Giáo viên thoát lớp thất bại' });
  }
  showSussce() {
    this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Cập nhật tài khoản giáo viên thành công' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Cập nhật tài khoản giáo viên thất bại !' });
  }
  showErrorStatus() {
    this.messageService.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Vui lòng thoát lớp trước khi đừng hoạt động !' });
  }
  showErrorStatus2() {
    this.messageService.add({ severity: 'error', summary: 'Đổi lớp thất bại', detail: 'Vui lòng thoát lớp trước khi đừng hoạt động !' });
  }

}