import { accountStudent } from './../../../../classes/Admin/account/user';
import { Component, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api'
  ;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent {
  myForm: FormGroup; // Khai báo FormGroup

  constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
    private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService) {

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

  listStudent: any;
  ngOnInit(): void {
    this.getData();
    this.getDataLop();
  }

  //Lấy dử liệu về
  public getData() {
    this.httpService.getList('taikhoan/hocsinh').subscribe(response => {
      this.listStudent = response;
    })
  }

  listItemStudent: any;
  username: string;
  editUser(username: string) {
    this.httpService.getItem('taikhoan', username).subscribe(response => {
      this.username = username;
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
      ngayTaoTaiKhoan: this.listItemStudent.ngayTaoTaiKhoan,
      vaiTro: {
        maVaiTro: '1'
      }
    }
    this.httpService.putItem('taikhoan', this.username, data).subscribe(response => {

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
    this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Cập nhật tài khoản học sinh thành công' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Lỗi khi cập nhật !' });
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

  getDataLop() {
    this.httpService.getList('lopthi').subscribe(response => {
      this.listLopThi = response;
      this.initializeLopThiOptions();
    })
  }

  initializeLopThiOptions() {
    // Kiểm tra nếu listLopThi đã được tải
    if (this.listLopThi) {
      this.lopThi = this.listLopThi.map(lop => {
        return { label: lop.tenLop, value: lop.maLopThi };
      });
    }
  }
  

  maskPassword(password: string): string {
    const maskedPassword = password.split('').map(() => '*').join('');
    return maskedPassword;
  }
}



// Xuất excel
// exportExcel() {
//   import('xlsx').then((xlsx) => {
//     const worksheet = xlsx.utils.json_to_sheet(this.listStudent);
//     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
//     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'Kỳ thi');
//   });
// }
// saveAsExcelFile(buffer: any, fileName: string): void {
//   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//   let EXCEL_EXTENSION = '.xlsx';
//   const data: Blob = new Blob([buffer], {
//     type: EXCEL_TYPE
//   });
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
// }
// }
