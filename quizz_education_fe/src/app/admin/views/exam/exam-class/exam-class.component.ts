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

  constructor(private messageService: MessageService, private httpService: HttpSvService, private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,) { }
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
  tenLopThi: string = '';
  soLuongHocSinh: number = 0;
  editLopThi(id: number) {
    this.httpService.getItem('lopthi', id).subscribe(response => {
      this.listLopHocId = response;
      this.tenLopThi = this.listLopHocId.tenLop;
      this.soLuongHocSinh = this.listLopHocId.soLuongToiDa;
      this.idLopThi = id;
    })
  }

  // Cập nhật môn thi 
  messageerror: string = "";
  updateMonThi() {
    const data = {
      maLopThi: this.idLopThi,
      tenLop: this.tenLopThi,
      soLuongToiDa: this.soLuongHocSinh
    }
    if (this.tenLopThi === '') {
      this.messageerror = "Tên lớp không được để trống!";
      this.showError()
    } else if (this.soLuongHocSinh == 0) {
      this.messageerror = "Số lượng học sinh không được để trống!";
      this.showError()
    } else if (this.soLuongHocSinh < 0) {
      this.messageerror = "Số lượng học sinh không được nhỏ hơn 0!";
      this.showError()
    } else {
      this.httpService.putItem('lopthi', this.idLopThi, data).subscribe(
        (response) => {
          this.show()
        },
        (error) => {
          console.log("Lỗi Cập nhật", error);
        }
      );
    }
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Lưu Thành Công', detail: 'Chỉnh sửa lớp thi thành công' });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: this.messageerror });

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
            setTimeout(() => {
              window.location.reload();
            }, 2000);
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


  // Xuất excel
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.listLopHoc);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Lớp thi');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
