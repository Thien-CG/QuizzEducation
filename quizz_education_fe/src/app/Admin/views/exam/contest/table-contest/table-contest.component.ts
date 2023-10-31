import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { HttpSvService } from '../../../../../service/API.service';
import { MessageService } from 'primeng/api';
import { DialogService,DynamicDialogRef  } from 'primeng/dynamicdialog';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

@Component({
  selector: 'app-table-contest',
  templateUrl: './table-contest.component.html',
  styleUrls: ['./table-contest.component.scss'],
  providers: [MessageService, DialogService]
})
export class TableContestComponent implements OnInit {
  constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
    private formBuilder: FormBuilder, private messageService: MessageService, public dialogService: DialogService) {


  }


  statuses: any[];

  ngOnInit(): void {
    this.getData();
    this.getTokenFromLocalStorage();
    this.getDataLop();
    this.getDataMon();

    this.statuses = [
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      
    ];
  }

  formatDateTime(dateTime: string): string {
    const currentDate = new Date(dateTime);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  //Lấy dử liệu về để cập nhật
  messageEdit: string = '';
  onSubmit() {

    // Định dạng lại thời gian sử dụng moment
    const formattedStartTime = moment(this.formattedStartTime).format("YYYY-MM-DD HH:mm:ss.S");
    const formattedEndTime = moment(this.formattedEndTime).format("YYYY-MM-DD HH:mm:ss.S");
    const currentTime = new Date().getTime();
    const formatcurrentTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss.S");
    const data = {
      maKyThi: this.idKyThi,
      tenKyThi: this.name,
      thoiGianBatDau: formattedStartTime, // Sử dụng thời gian đã định dạng
      thoiGianKetThuc: formattedEndTime, // Sử dụng thời gian đã định dạng
      daDienRa: true,
      taiKhoan: {
        tenDangNhap: this.username,
      },
    };
    const id = this.itemKyThi.maKyThi; // Lấy id từ dữ liệu hiện tại
    if (!this.idKyThi || !this.name || !this.formattedStartTime || !this.formattedEndTime) {
      this.messageEdit = "Vui lòng điền đầy đủ thông tin."
      return;
    }
    if (formattedStartTime >= formattedEndTime) {
      this.messageEdit = 'Thời gian bắt đầu phải trước thời gian kết thúc.';
      return;
    }
    if (formatcurrentTime >= formattedEndTime) {
      this.messageEdit = 'Thời gian hiện tại phải nhỏ hơn thời gian kết thúc.';
      return;
    }
    const apiUrl = `http://localhost:8080/quizzeducation/api/kythi/${id}`;
    this.http.put(apiUrl, data)
      .subscribe((response: any) => {
        console.log('Dữ liệu đã được gửi thành công:', response);
        window.location.reload();
      }, (error: any) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });

  }
  public updateStaff() {
    const data = {
      tenKyThi: this.name,
      thoiGianBatDau: this.formattedStartTime,
      thoiGianKetThuc: this.formattedEndTime,
      daDienRa: true,
      taiKhoan: {
        tenDangNhap: this.username,
      },
    };

    const id = this.itemKyThi.maKyThi; // Lấy id từ dữ liệu hiện tại

    // Gọi hàm putItem để cập nhật thông tin nhân viên
    this.httpService.putItem('kyThi', id, data)
      .subscribe(
        (response) => {
          // Xử lý khi cập nhật thành công
          console.log("Cập nhật nhân viên thành công: ", response);
        },
        (error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi cập nhật nhân viên:", error);
        }
      );
  }




  // test
  listContest: any;
  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  public getData() {
    this.httpService.getList('kythi').subscribe(response => {
      this.listContest = response;

    })
  }

  getContestStatus(startTime: string, endTime: string): string {
    const currentTime = new Date().getTime();
    const startTimeMillis = new Date(startTime).getTime();
    const endTimeMillis = new Date(endTime).getTime();

    if (currentTime < startTimeMillis) {
      return 'Chưa thi';
    } else if (currentTime > endTimeMillis) {
      return 'Đã thi';
    } else {
      return 'Đang thi';
    }
  }


  idKyThi: number | undefined;
  name: string = '';
  public itemKyThi: any = {};
  contestStatus: string = '';
  formattedStartTime: string = '';
  formattedEndTime: string = '';
  getEditKyThi(id: number) {
    this.idKyThi = id;
    this.httpService.getItem("kythi", id).subscribe((response: any) => {
      this.itemKyThi = response;
      this.formattedStartTime = this.formatDateTime(this.itemKyThi.thoiGianBatDau);
      this.formattedEndTime = this.formatDateTime(this.itemKyThi.thoiGianKetThuc);
      this.name = this.itemKyThi.tenKyThi;
    });
  }

  @ViewChild('confirmButton', { static: false }) confirmButton: ElementRef;
  // chi tiết kì thi
  itemChiTietKiThi: any;
  tenKyThi: number;
  getItemChiTietKyThi(id: number) {
    this.httpService.getItem("chitietkythi/kythi", id).subscribe((response: any) => {
      this.itemChiTietKiThi = response;
      this.confirmButton.nativeElement.click();
      if (this.itemChiTietKiThi && Array.isArray(this.itemChiTietKiThi)) {
        const tenKyThiArray = this.itemChiTietKiThi.map(item => item.kyThi.tenKyThi);
        this.tenKyThi = tenKyThiArray[0];
      } else {
        console.error("Dữ liệu không tồn tại hoặc không hợp lệ");
      }



    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không có chi tiết kỳ thi trong kỳ thi này ' });
    });
  }


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

  monThi: any[] = [];
  listMonThi: any;

  getDataMon() {
    this.httpService.getList('monthi').subscribe(response => {
      this.listMonThi = response;
      this.initializeMonThiOptions();
    })
  }

  initializeMonThiOptions() {
    // Kiểm tra nếu listLopThi đã được tải
    if (this.listMonThi) {
      this.monThi = this.listMonThi.map(lop => {
        return { label: lop.tenMon, value: lop.maMon };
      });
    }
  }



  // Lấy dữ liệu người dùng từ Local Storage
  user: any;
  username: any;
  clonedProducts: { [s: string]: any } = {};

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
          this.httpService.getItem('taikhoan', this.user.tenDangNhap).subscribe((userData) => {
            this.user = userData;
            this.username = this.user.tenDangNhap
            // console.log(this.username);
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

  tinhThoiGianChenhLech(itemChiTietKiThi: any): number {
    const thoiGianKetThuc = new Date(itemChiTietKiThi.thoiGianKetThuc);
    const thoiGianBatDau = new Date(itemChiTietKiThi.thoiGianBatDau);
    const thoiGianChenhLech = thoiGianKetThuc.getTime() - thoiGianBatDau.getTime();
    return thoiGianChenhLech / 60000;
  }

  // edit chi tiết kỳ thi
  onRowEditInit(product: any) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: any) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }

  onRowEditCancel(product: any, index: number) {
    this.itemChiTietKiThi[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  ref: DynamicDialogRef | undefined;


  show() {
      this.ref = this.dialogService.open(ContestDetailComponent, { header: 'Select a Product'});
  }
}