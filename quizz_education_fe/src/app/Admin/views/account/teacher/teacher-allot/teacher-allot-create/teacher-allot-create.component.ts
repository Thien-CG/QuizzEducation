import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpSvService } from '../../../../../../service/API.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-teacher-allot-create',
  templateUrl: './teacher-allot-create.component.html',
  styleUrls: ['./teacher-allot-create.component.scss']
})
export class TeacherAllotCreateComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup

  constructor(private fb: FormBuilder, private httpService: HttpSvService, private http: HttpClient, private messageService: MessageService) {

    // Khởi tạo FormGroup và các FormControl
    this.myForm = this.fb.group({
      tengiaovien: ['', [Validators.required]],
      tenkythi: ['', [Validators.required]],
      tenmonthi: ['', [Validators.required]],
      thoihan: ['', [Validators.required]],

    });
  }
  ngOnInit(): void {

    this.getDataTecher();
    this.getDataKyThi();
    this.getDataMonThi();
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
  }

  // data tài khoản giáo viên
  listTeacher: any;
  getDataTecher() {
    this.httpService.getList('taikhoan/giaovien').subscribe(response => {
      this.listTeacher = response;
      this.selectHoVaTen();
    }, error => {
      console.log("lỗi khi lấy dử liệu");
    })
  }

  // select theo tên giáo viên 
  hovaten: any[] = [];
  selectHoVaTen() {
    if (this.listTeacher) {
      this.hovaten = this.listTeacher.map(map => {
        return { label: map.hoVaTen, value: map.tenDangNhap };
      });
    } else {
      console.log("không có dử liệu của giáo viên");
    }

  }

  // data kỳ thi
  listKyThi: any;
  getDataKyThi() {
    this.httpService.getList('kythi').subscribe(response => {
      this.listKyThi = response;
      this.selectTenKythi();
    }, error => {
      console.log("lỗi khi lấy dử liệu");
    })
  }
  // select theo kì thi
  tenkythi: any[] = [];
  selectTenKythi() {
    if (this.listKyThi) {
      this.tenkythi = this.listKyThi.map(map => {
        return { label: map.tenKyThi, value: map.maKyThi };
      });
    } else {
      console.log("không có dử liệu của giáo viên");
    }
  }

  // data môn thi
  listMonThi: any;
  getDataMonThi() {
    this.httpService.getList('monthi').subscribe(response => {
      this.listMonThi = response;
      this.selectMonKythi();
    }, error => {
      console.log("lỗi khi lấy dử liệu");
    })
  }

  // select theo kì thi
  tenMonthi: any[] = [];
  selectMonKythi() {
    if (this.listMonThi) {
      this.tenMonthi = this.listMonThi.map(map => {
        return { label: map.tenMon, value: map.maMon };
      });
    } else {
      console.log("không có dử liệu của giáo viên");
    }
  }

  // tạo phân công
  createPhanCong() {
    const thoihan = this.myForm.get('thoihan').value;
    const currentTime = new Date().getTime(); // Lấy thời gian hiện tại ở định dạng timestamp

    if (thoihan < currentTime) {
      console.log("Lỗi: Thời hạn đã chọn nhỏ hơn thời gian hiện tại.");
      return;
    }
    const dataPhanCong = {
      daTaoDe: 0,
      thoiHan: this.myForm.get('thoihan').value,
      kyThi: {
        maKyThi: this.myForm.get('tenkythi').value.value,
      },
      monThi: {
        maMon: this.myForm.get('tenmonthi').value.value
      },
      taiKhoan: {
        tenDangNhap: this.myForm.get('tengiaovien').value.value
      }
    }


    this.httpService.postItem('phancong', dataPhanCong).subscribe(data => {
      this.showSussceCreate()
      setTimeout(() => {
        location.reload();
      }, 2000);
    }, err => {
      this.showError();
    });
  }

  // reset form
  resetForm() {
    this.myForm.reset();
  }



  showSussce() {
    this.messageService.add({ severity: 'success', summary: 'Tạo thành công', detail: 'Tạo tài khoản thành công' });
  }
  showSussceCreate() {
    this.messageService.add({ severity: 'success', summary: 'Tạo thành công', detail: 'Tạo phân công thành công' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Tạo thất bại', detail: 'Tài khoản đã tồn tại !' });
  }
}
