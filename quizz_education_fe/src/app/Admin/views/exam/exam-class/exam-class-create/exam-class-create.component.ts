import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpSvService } from '../../../../../service/API.service';
@Component({
  selector: 'app-exam-class-create',
  templateUrl: './exam-class-create.component.html',
  styleUrls: ['./exam-class-create.component.scss']
})
export class ExamClassCreateComponent {

  myFormLopThi: FormGroup;
  constructor(private messageService: MessageService, private httpService: HttpSvService, private fb: FormBuilder,) {
    this.myFormLopThi = this.fb.group({
      tenLop: ['', [Validators.required]],
      soLuong: ['', [Validators.required]],
    });
  }// Khai báo các biến

  // Hàm tạo lớp thi
  createLopThi() {
    if (this.myFormLopThi.invalid) {
      for (const control in this.myFormLopThi.controls) {
        if (this.myFormLopThi.controls.hasOwnProperty(control)) {
          this.myFormLopThi.controls[control].markAsTouched();
        }
      }
      return;
    }
    // Dữ liệu để gửi lên server
    const data = {
      tenLop: this.myFormLopThi.get('tenLop').value,
      soLuongToiDa: this.myFormLopThi.get('soLuong').value,
    };

    // Gửi yêu cầu tạo lớp thi
    this.httpService.postItem('lopthi', data).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Tạo mới thành công', detail: 'Tạo mới lớp thi thành công' });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      (error) => {
        console.log('Lỗi tạo mới', error);
      }
    );
  }


  // Làm mới
  clear() {
    this.myFormLopThi.reset();
  }
}
