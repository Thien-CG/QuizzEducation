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
  myFormCauHoi: FormGroup;
  myFormDapAn1: FormGroup;
  myFormDapAn2: FormGroup;
  myFormDapAn3: FormGroup;
  myFormDapAn4: FormGroup;
  myFormDapAn: FormGroup;
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

    this.myFormCauHoi = this.fb.group({
      maCauHoi: ['', [Validators.required]],
      noiDungCauHoi: ['', [Validators.required]],
      diemCauHoi: ['', [Validators.required]],
      nhieuDapAn: [''],
      maDeThi: [''],
    });

    this.myFormDapAn1= this.fb.group({
      maDapAn1: ['', [Validators.required]],
      noiDungDapAn1: ['', [Validators.required]],
      dapAnDung1: [''],
      maCauHoi1: [''],
      diemDapAn1: ['', [Validators.required]],
    });

    this.myFormDapAn2= this.fb.group({
      maDapAn2: ['', [Validators.required]],
      noiDungDapAn2: ['', [Validators.required]],
      dapAnDung2: [''],
      maCauHoi2: [''],
      diemDapAn2: ['', [Validators.required]],
    });

    this.myFormDapAn3= this.fb.group({
      maDapAn3: ['', [Validators.required]],
      noiDungDapAn3: ['', [Validators.required]],
      dapAnDung3: [''],
      maCauHoi3: [''],
      diemDapAn3: ['', [Validators.required]],
    });

    this.myFormDapAn4= this.fb.group({
      maDapAn4: ['', [Validators.required]],
      noiDungDapAn4: ['', [Validators.required]],
      dapAnDung4: [''],
      maCauHoi4: [''],
      diemDapAn4: ['', [Validators.required]],
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
    const thoiGianChenhLech =
      thoiGianKetThuc.getTime() - thoiGianBatDau.getTime();
    return thoiGianChenhLech / 60000;
  }
  listContest: any;
  listChiTietKyThi: any;
  itemPhanCong: any;
  user: any;
  maphancong: number;
  formattedStartTime: string = '';
  formattedEndTime: string = '';
  ngayTaoDe: Date = new Date();
  editTeacher(maphancong: number) {
    this.httpService.getItem('phancong', maphancong).subscribe((response) => {
      this.itemPhanCong = response;

      this.myForm.get('selectedKyThi').setValue(response.kyThi.tenKyThi);
      this.myForm.get('selectedMonThi').setValue(response.monThi.tenMon);
      this.myForm.get('maMon').setValue(response.monThi.maMon);
    });
  }

  noiDungCauHoi: string = '';
  diemCauHoi: number;
  nhieuDapAn: boolean = false;
  addToQuestion() {
    const data = {
      maCauHoi: '',
      noiDungCauHoi: this.myFormCauHoi.get('noiDungCauHoi').value,
      diemCauHoi: this.myFormCauHoi.get('diemCauHoi').value,
      nhieuDapAn: this.myFormCauHoi.get('nhieuDapAn').value,
      deThi:this.itemDeThi,
    };
  
    this.httpService.postItem('cauhoi', data).subscribe(
      (response) => {
        this.itemCauHoi=response;
        this.diemCauHoi=response.diemCauHoi;
        console.log('DataCauHoi: ', response);
       
      },
      (error) => {
        console.log('Lỗi tạo câu hỏi', error);
      }
    );

    console.log(data);
  }

  
  maDapAn1:number;
  noiDungDapAn1:string='';
  dapAnDung1:boolean=false;
  diemDapAn1:number;

  maDapAn2:number;
  noiDungDapAn2:string='';
  dapAnDung2:boolean=false;
  diemDapAn2:number;
  
  maDapAn3:number;
  noiDungDapAn3:string='';
  dapAnDung3:boolean=false;
  diemDapAn3:number;

  maDapAn4:number;
  noiDungDapAn4:string='';
  dapAnDung4:boolean=false;
  diemDapAn4:number;

  itemDapAn:any;
  addToAnswer(){
    const data1 = {
      maDapAn: '',
      noiDungDapAn: this.myFormDapAn1.get('noiDungDapAn1').value,
      dapAnDung: this.myFormDapAn1.get('dapAnDung1').value,
      cauHoi: this.itemCauHoi,
      diemDapAn: this.diemCauHoi,
    };
    this.httpService.postItem('dapan', data1).subscribe(
      (response) => {
        this.itemDapAn=response;
        console.log('DataA: ', response);
       
      },
      (error) => {
        console.log('Lỗi tạo dap an', error);
      }
    );
    const data2 = {
      maDapAn: '',
      noiDungDapAn: this.myFormDapAn2.get('noiDungDapAn2').value,
      dapAnDung: this.myFormDapAn2.get('dapAnDung2').value,
      cauHoi:this.itemCauHoi,
      diemDapAn:  this.diemCauHoi,
    };
    this.httpService.postItem('dapan', data2).subscribe(
      (response) => {
        this.itemDapAn=response;
        console.log('DataB: ', response);
       
      },
      (error) => {
        console.log('Lỗi tạo dap an', error);
      }
    );
    const data3 = {
      maDapAn: '',
      noiDungDapAn: this.myFormDapAn3.get('noiDungDapAn3').value,
      dapAnDung: this.myFormDapAn3.get('dapAnDung3').value,
      cauHoi:this.itemCauHoi,
      diemDapAn:  this.diemCauHoi,
    };
    this.httpService.postItem('dapan', data3).subscribe(
      (response) => {
        this.itemDapAn=response;
        console.log('DataC: ', response);
       
      },
      (error) => {
        console.log('Lỗi tạo dap an', error);
      }
    );
    const data4 = {
      maDapAn: '',
      noiDungDapAn: this.myFormDapAn4.get('noiDungDapAn4').value,
      dapAnDung: this.myFormDapAn4.get('dapAnDung4').value,
      cauHoi:this.itemCauHoi,
      diemDapAn:  this.diemCauHoi,
    };
    this.httpService.postItem('dapan', data4).subscribe(
      (response) => {
        this.itemDapAn=response;
        console.log('DataD: ', response);
       
      },
      (error) => {
        console.log('Lỗi tạo dap an', error);
      }
    );
  }

  tenDeThi: string = '';
  maChiTietKyThi: number;
  maDeThi: number;

addToQA(){
  this.addToQuestion;
  this.addToAnswer;
  console.log(this.addToQuestion);
  console.log(this.addToAnswer);
}
  addToExam() {
    
    this.listChiTietKyThi.forEach((chiTiet) => {
      if (
        chiTiet.kyThi.maKyThi === this.itemPhanCong.kyThi.maKyThi &&
        chiTiet.monThi.maMon === this.itemPhanCong.monThi.maMon
      ) {
        console.log('Mã chi tiết kỳ thi: ', chiTiet.maChiTietKyThi);
        this.maChiTietKyThi = chiTiet.maChiTietKyThi;
      }
    });

    const data = {
      maDeThi: '',
      tenDeThi: this.tenDeThi,
      taiKhoan: {
        tenDangNhap: this.user.tenDangNhap,
      },
      chiTietKyThi: {
        maChiTietKyThi: this.maChiTietKyThi,
      },
      ngayTao: new Date(),
      monThi: {
        maMon: this.itemPhanCong.monThi.maMon,
      },
      daSuDung: false,
    };
    console.log('Mã phaan coong: ', this.itemPhanCong);
    this.httpService.postItem('dethi', data).subscribe(
      (response) => {
        this.itemDeThi=response;
        this.itemPhanCong.daTaoDe = true;
        this.maDeThi = response.maDeThi;
        console.log('DataDeThi: ', response);
        this.httpService
          .putItem('phancong', this.itemPhanCong.maPhanCong, this.itemPhanCong)
          .subscribe((response) => {
            // window.location.reload();
          });
      },
      (error) => {
        console.log('Lỗi tạo mới', error);
      }
    );
  }
  itemCauHoi:any;
  itemDeThi: any;
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
    this.httpService.getList(`chitietkythi`).subscribe((response) => {
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
    this.httpService.getList('dethi').subscribe((data) => {
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

  editTabs() {
    this.activeTab = 'danh-sach';
    this.showLichPhanCong = true;
    this.showTaoDeThi = false;
  }

  public displayModalGrnDetail: boolean = false;
  public showDialogModalGrnDetail() {
    this.displayModalGrnDetail = true;
  }
}
