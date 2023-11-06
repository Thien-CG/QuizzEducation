import { examClass } from './../../../../classes/Admin/exam/exam-class';
import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-exam-class',
  templateUrl: './exam-class.component.html',
  styleUrls: ['./exam-class.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ExamClassComponent {

  myFormLopThi: FormGroup;
  constructor(private messageService: MessageService, private fb: FormBuilder, private httpService: HttpSvService, private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,) {

    this.myFormLopThi = this.fb.group({
      tenLop: ['', [Validators.required]],
      soLuong: ['', [Validators.required]],
    });
  }
  //Khai báo các biến ở đây
  // listLopHoc!: examClass[];
  listLopHoc!: examClass[];


  //Sửa lại chổ tìm kiếm trong thư viện
  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  ngOnInit(): void {
    this.getData();
  }

  //Lấy data về từ API
  public getData() {
    this.httpService.getList('lopthi').subscribe(response => {
      this.listLopHoc = response;
    })
  }

  // Lấy id về để chỉnh sửa
  //Gọi API Theo id
  listLopHocId: any;
  idLopThi: any;

  editLopThi(id: number) {
    this.httpService.getItem('lopthi', id).subscribe(response => {
      this.listLopHocId = response;
      this.myFormLopThi.get('tenLop').setValue(this.listLopHocId.tenLop);
      this.myFormLopThi.get('soLuong').setValue(this.listLopHocId.soLuongToiDa);
      this.idLopThi = id;
    })
  }

  // Cập nhật môn thi 
  updateMonThi() {

    if (this.myFormLopThi.invalid) {
      for (const control in this.myFormLopThi.controls) {
        if (this.myFormLopThi.controls.hasOwnProperty(control)) {
          this.myFormLopThi.controls[control].markAsTouched();
        }
      }
      return;
    }
    const data = {
      maLopThi: this.idLopThi,
      tenLop: this.myFormLopThi.get('tenLop').value,
      soLuongToiDa: this.myFormLopThi.get('soLuong').value,
    }

    this.httpService.putItem('lopthi', this.idLopThi, data).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Lưu Thành Công', detail: 'Chỉnh sửa lớp thi thành công' });
        this.getData();
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: "Không sát định" });
      }
    );

  }


  // Thông báo xóa
  deleteMonThi(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa không!',
      header: 'Chú ý',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.httpService.deleteItem('lopthi', id).subscribe(
          (response) => {
            this.messageService.add({ severity: 'info', summary: 'Thông báo', detail: 'Xóa thành công' });

            this.getData();
          },
          (error) => {
            console.log("Lỗi Xóa", error);
          }
        );

      }

    })
  }

  // Xóa môn thi
  // Kiểm tra xem môn thi có dính khóa ngoại từ ChiTietKyThi không
  checkIfMonThiIsReferenced(id: number) {
    this.httpService.getItems('chitietkythi', 'lopthi', id).subscribe(
      (response) => {
        if (response.length > 0) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi khi xóa', detail: 'Lớp học đã được thêm vào kì thi!!' });
        }
      },
      (error) => {
        this.deleteMonThi(id);
      }
    );
  }


}
