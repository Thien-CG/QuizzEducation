import { UntypedFormBuilder } from '@angular/forms';
import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { format } from 'date-fns';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss'],
  providers: [MessageService],
})
export class ChecksRadiosComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup

  constructor(
    private renderer: Renderer2,
    private httpService: HttpSvService,
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.myForm = this.fb.group({
      daTaoDe: [''],
      selectedthoiGianBatDau: ['', [Validators.required]],
      selectedthoiGianKetThuc: ['', [Validators.required]],
      selectedKyThi: ['', [Validators.required]],
      selectedMonThi: ['', [Validators.required]],
      selectedThoiGian: ['', [Validators.required]],
      maDeThi: ['', [Validators.required]],
      tenDeThi: ['', [Validators.required]],
      ngayTao: ['', [Validators.required]],
      maMon: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getTokenFromLocalStorage();
    this.getData();
    this.getDeThi();
    this.getListChiTietKyThi();

     // Lấy ngày hiện tại
     const currentDate = new Date();

     // Định dạng ngày hiện tại thành chuỗi (VD: 'YYYY-MM-DDTHH:mm')
     // Định dạng ngày hiện tại thành chuỗi "dd/mm/yyyy"
     const formattedDate = format(currentDate, 'dd/MM/yyyy');
 
     // Đặt giá trị của trường ngày tạo thành ngày hiện tại
     this.myForm.get('ngayTao').setValue(formattedDate);
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
  tinhThoiGianChenhLech(itemChiTietKiThi: any): number {
    const thoiGianKetThuc = new Date(itemChiTietKiThi.thoiGianKetThuc);
    const thoiGianBatDau = new Date(itemChiTietKiThi.thoiGianBatDau);
    const thoiGianChenhLech = thoiGianKetThuc.getTime() - thoiGianBatDau.getTime();
    return thoiGianChenhLech / 60000;
  }
  listContest: any;
  listChiTietKyThi: any;
  itemPhanCong:any;
  user: any;
  maphancong: number;
  formattedStartTime: string = '';
  formattedEndTime: string = '';
  ngayTaoDe: Date= new Date();
  editTeacher(maphancong: number) {

    this.httpService.getItem('phancong', maphancong).subscribe((response) => {
      this.itemPhanCong = response;
     
    this.myForm.get('selectedKyThi').setValue(response.kyThi.tenKyThi);
    this.myForm.get('selectedMonThi').setValue(response.monThi.tenMon);
    this.myForm.get('maMon').setValue(response.monThi.maMon);
    
    });
  }
  tenDeThi: string = '';
  maChiTietKyThi:number;
  addToExam(){

    const targetMaKyThi = 'your-maKyThi'; // Thay thế 'your-maKyThi' bằng maKyThi bạn muốn so sánh
      this.listChiTietKyThi.forEach((chiTiet) => {
        
        if(chiTiet.kyThi.maKyThi === this.itemPhanCong.kyThi.maKyThi && chiTiet.maChiTietKyThi === this.itemPhanCong.maPhanCong){
          console.log("Mã chi tiết kỳ thi: ",chiTiet.maChiTietKyThi)
          this.maChiTietKyThi = chiTiet.maChiTietKyThi;
          
        }
       
      });


    const data = {
      maDeThi:"",
      tenDeThi:this.tenDeThi,
      taiKhoan: {
        tenDangNhap: this.user.tenDangNhap,
      },
      chiTietKyThi:{
        maChiTietKyThi:this.maChiTietKyThi
      },
      ngayTao: new Date(),
      monThi:{
        maMon:this.itemPhanCong.monThi.maMon
      },
      daSuDung:false
      
     
    };
    console.log("Mã phaan coong: ",this.itemPhanCong)
    this.httpService.postItem('dethi', data).subscribe(
      (response) => {
        this.itemPhanCong.daTaoDe = true;
        this.httpService.putItem('phancong', this.itemPhanCong.maPhanCong,this.itemPhanCong).subscribe(
      (response) => {
        window.location.reload();
        
      });
      },
      (error) => {
        console.log('Lỗi tạo mới', error);
      }
    );
    console.log("DataDeThi: ",data)
  }

  itemDeThi:any;
  updataThongTin() {
    const data = {
      maPhanCong: this.maphancong,
      daTaoDe: this.myForm.get('daTaoDe').value,
      kyThi: {
        tenKyThi: this.myForm.get('selectedKyThi').value.value,
        thoiGianBatDau: this.myForm.get('selectedKyThi').value.value,
        thoiGianKetThuc: this.myForm.get('selectedKyThi').value.value,
      },
      monThi: {
        tenMon: this.myForm.get('selectedMonThi').value.value,
      },
    };

    this.httpService.putItem('phancong', this.maphancong, data).subscribe(
      (response) => {
        this.showSussce();
        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      (error) => {
        console.log('Lỗi không sát định', error);
        this.showError();
      }
    );
  }
  daTaoDe: any[] = [
    { label: 'Đã tạo đề', value: 'true' },
    { label: 'Chưa tạo đề', value: 'false' },
  ];

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.fb.group({
    setRows: new FormControl(5),
    search: new FormControl(''),
  });

  getData() {
    this.httpService
      .getList(`phancong/taikhoan/${this.user.tenDangNhap}`)
      .subscribe((response) => {
        this.listContest = response;
        console.log(this.listContest);
      });
  }
  getListChiTietKyThi() {
    this.httpService
      .getList(`chitietkythi`)
      .subscribe((response) => {
        this.listChiTietKyThi = response;
      });
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();
      try {
        const decodedToken = helper.decodeToken(token);
        if (decodedToken.sub) {
          this.user = JSON.parse(decodedToken.sub);
          this.getUserFromDB(this.user.tenDangNhap);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  getUserFromDB(tenDangNhap: string) {
    this.httpService.getItem('taikhoan', tenDangNhap).subscribe((userData) => {
      this.user = userData;
    });
  }
  showSussce() {
    this.messageService.add({
      severity: 'success',
      summary: 'Cập nhật thành công',
      detail: 'Cập nhật thành công',
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Cập nhật thất bại',
      detail: 'Cập nhật  thất bại !',
    });
  }


  monThi: any[] = [];
dethi: any[] = [];

getDeThi() {
  this.httpService.getList('dethi').subscribe(data => {
    this.dethi = data;
  });
}

activeTab: string = 'danh-sach';
showLichPhanCong: boolean = true; // Mặc định hiển thị tab "Lịch phân công"
showTaoDeThi: boolean = false; // Ẩn tab "Tạo đề thi" ban đầu
//Chuyển tab khi edit
switchToEditTab() {
  this.activeTab = 'tao-de-thi'; // Chuyển sang tab "Tạo đề thi"
  this.showLichPhanCong = false; // Ẩn tab "Lịch phân công"
  this.showTaoDeThi = true; // Hiển thị tab "Tạo đề thi"
}

editTabs(){
   this.activeTab = 'danh-sach';
    this.showLichPhanCong = true; 
    this.showTaoDeThi = false; 
  
}



}
