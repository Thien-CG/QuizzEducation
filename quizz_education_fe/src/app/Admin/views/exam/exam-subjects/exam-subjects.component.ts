import { examSubject } from '../../../../classes/Admin/exam/exam-subject';
import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-exam-subjects',
  templateUrl: './exam-subjects.component.html',
  styleUrls: ['./exam-subjects.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ExamSubjectsComponent {
  constructor(private messageService: MessageService,
     private httpService: HttpSvService, private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,) { }
  //Khai báo các biến ở đây
  ListexamClass!: examSubject[];
  //Sửa lại chổ tìm kiếm trong thư v iện
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
    this.httpService.getList('monthi').subscribe(response => {
      this.ListexamClass = response;
    })
  }

  // Lấy id về để chỉnh sửa
  //Gọi API Theo id
  listMonHocId: any;
  idMonThi: any;
  tenMonThi: string | undefined;
  thoiGianLamBai: number = 0;
  editMonThi(id: number) {
    this.httpService.getItem('monthi', id).subscribe(response => {
      this.listMonHocId = response;
      this.tenMonThi = this.listMonHocId.tenMon;
      this.thoiGianLamBai = this.listMonHocId.thoiGianLamBai;
      this.idMonThi = id;
    })
  }

  // Cập nhật môn thi
  messageerror: string = "";
  updateMonThi() {
    const data = {
      maMon: this.idMonThi,
      tenMon: this.tenMonThi,
      thoiGianLamBai: this.thoiGianLamBai
    }
    if (this.tenMonThi === '') {
      this.messageerror = "Tên môn không được để trống!";
      this.showError()
    } else if (this.thoiGianLamBai == 0) {
      this.messageerror = "Thời gian làm bài không được để trống!";
      this.showError()
    } else if (this.thoiGianLamBai < 0) {
      this.messageerror = "Thời gian không được nhỏ hơn 0!";
      this.showError()
    } else {
      this.httpService.putItem('monthi', this.idMonThi, data).subscribe(
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
    this.messageService.add({ severity: 'success', summary: 'Lưu Thành Công', detail: 'Chỉnh sửa môn thi thành công' });
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
        this.httpService.deleteItem('monthi', id).subscribe(
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
    this.httpService.getItems('chitietkythi', 'monthi', id).subscribe(
      (response) => {
        if (response.length > 0) {
          this.messageService.add({ severity: 'error', summary: 'Lỗi khi xóa', detail: 'Môn học đã được thêm vào kì thi!!' });
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
      const worksheet = xlsx.utils.json_to_sheet(this.ListexamClass);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'Môn thi');
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
