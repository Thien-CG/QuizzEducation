import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpSvService } from '../../../../../service/API.service';

@Component({
  selector: 'app-table-contest',
  templateUrl: './table-contest.component.html',
  styleUrls: ['./table-contest.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class TableContestComponent implements OnInit {

  myForm: FormGroup;
  myFormMonThi: FormGroup;
  myFormKyThi: FormGroup;
  constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient, private confirmationService: ConfirmationService, private elementRef: ElementRef,
    private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService, public dialogService: DialogService, private modalService: NgbModal) {

    // Khởi tạo FormGroup và các FormControl
    this.myForm = this.fb.group({
      tenMon: ['', [Validators.required]],
      tenLop: ['', [Validators.required]],
      thoiGianBatDau: ['', [Validators.required]],
      thoiGianKetThuc: ['', [Validators.required]],

      tenMon1: ['', [Validators.required]],
      tenLop1: ['', [Validators.required]],
      thoiGianBatDau1: ['', [Validators.required]],
      thoiGianKetThuc1: ['', [Validators.required]],

    });

    this.myFormMonThi = this.fb.group({
      tenMon2: ['', [Validators.required]],
      tenLop2: ['', [Validators.required]],
      thoiGianBatDau2: ['', [Validators.required]],
      thoiGianKetThuc2: ['', [Validators.required]],
    });
    this.myFormKyThi = this.fb.group({
      tenKyThi: ['', [Validators.required]],
      thoiGianBatDau: ['', [Validators.required]],
      thoiGianKetThuc: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getData();
    this.getTokenFromLocalStorage();
    this.getDataLop();
    this.getDataMon();

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
    if (this.myFormKyThi.invalid) {
      for (const control in this.myFormKyThi.controls) {
        if (this.myFormKyThi.controls.hasOwnProperty(control)) {
          this.myFormKyThi.controls[control].markAsTouched();
        }
      }
      return;
    }
    if (this.myFormKyThi.get('thoiGianBatDau').value >= this.myFormKyThi.get('thoiGianKetThuc').value) {
      this.messageEdit = 'Thời gian bất đầu phải nhỏ hơn thời gian kết thúc';
      return;
    }
    const statTime = new Date(this.dskythi.thoiGianBatDau);
    const endTime = new Date(this.dskythi.thoiGianKetThuc);

    if (this.dskythi.tenKyThi == this.myFormKyThi.get('tenKyThi').value && statTime.getTime() === this.myFormKyThi.get('thoiGianBatDau').value.getTime() && endTime.getTime() === this.myFormKyThi.get('thoiGianKetThuc').value.getTime()) {
      this.messageService.add({ severity: 'error', summary: 'Thông báo cập nhật thất bại', detail: 'Không có gì thay đổi để cập nhật' });
      return;
    }


    const data = {
      maKyThi: this.id,
      tenKyThi: this.myFormKyThi.get('tenKyThi').value,
      thoiGianBatDau: this.myFormKyThi.get('thoiGianBatDau').value,
      thoiGianKetThuc: this.myFormKyThi.get('thoiGianKetThuc').value,
      daDienRa: true,
      taiKhoan: {
        tenDangNhap: "AoNhatDuy",
        // this.username,
      },
    };
    this.httpService.putItem("kythi", this.id, data)
      .subscribe((response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Thông báo cập nhật', detail: 'Cập nhật kỳ thi thành công' });
        // setTimeout(() => {
        //   location.reload();
        // }, 2000);
        this.getData()
        this.getEditKyThi(this.id)
      }, (error: any) => {
        console.error('Lỗi khi gửi dữ liệu:', error);
      });

  }



  id: number;
  name: string = '';
  public dskythi: any = {};

  getEditKyThi(id: number) {
    this.id = id;
    this.httpService.getItem("kythi", id).subscribe((response: any) => {
      this.dskythi = response;
      this.myFormKyThi.get('tenKyThi').setValue(this.dskythi.tenKyThi)
      const stattime = new Date(this.dskythi.thoiGianBatDau)
      const endtime = new Date(this.dskythi.thoiGianKetThuc)
      this.myFormKyThi.get('thoiGianBatDau').setValue(stattime)
      this.myFormKyThi.get('thoiGianKetThuc').setValue(endtime)

    });
  }

  date: Date | undefined;



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

  getContestStatus(startTime: Date, endTime: Date): string {
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

  // idKyThi: number;
  // name: string = '';
  // itemKyThi: any;
  // getEditKyThi(id: number) {
  //   this.idKyThi = id;
  //   this.httpService.getItem("kythi", id).subscribe((response: any) => {
  //     this.itemKyThi = response;
  //     this.myFormKyThi.get('tenKyThi').setValue(this.itemKyThi.tenKyThi);
  //     this.myFormKyThi.get('thoiGianBatDau').setValue(this.itemKyThi.thoiGianBatDau);
  //     this.myFormKyThi.get('thoiGianKetThuc').setValue(this.itemKyThi.thoiGianKetThuc);

  //   });
  // }


  @ViewChild('confirmButton', { static: false }) confirmButton: ElementRef;
  // chi tiết kì thi
  itemChiTietKiThi: any;
  tenKyThi: number;
  idItemKyThi: number;
  TimeStart: Date
  TimeEnd: Date;
  getItemChiTietKyThi(id: number, timebatdau: Date, timeketthuc: Date) {
    this.httpService.getItem("chitietkythi/kythi", id).subscribe((response: any) => {
      this.idItemKyThi = id;
      this.TimeStart = timebatdau
      this.TimeEnd = timeketthuc
      this.selectMonThi();
      this.itemChiTietKiThi = response;
      this.confirmButton.nativeElement.click();
      this.getStatus()
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
  getStatus() {
    return this.getContestStatus(this.TimeStart, this.TimeEnd);
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


  selecttenmon: any[] | undefined;
  cities2: any[] | undefined;
  selecttenlop: any[] | undefined;
  selectAlltenmon: any[] | undefined;
  selectAlltenlop: any[] | undefined;


  // date: Date[] | undefined;
  selectedCity: any | undefined;
  tinhThoiGianChenhLech(itemChiTietKiThi: any): number {
    const thoiGianKetThuc = new Date(itemChiTietKiThi.thoiGianKetThuc);
    const thoiGianBatDau = new Date(itemChiTietKiThi.thoiGianBatDau);

    // Tính thời gian chênh lệch giữa thời gian kết thúc và thời gian bắt đầu
    const thoiGianChenhLechMillis = thoiGianKetThuc.getTime() - thoiGianBatDau.getTime();

    // Chuyển kết quả sang phút và làm tròn đến số phút gần nhất
    const thoiGianChenhLechMinutes = thoiGianChenhLechMillis / (1000 * 60);
    return Math.round(thoiGianChenhLechMinutes);
  }

  // Lấy id của chi tiết kì thi về và đưa lên form edit
  itemChiTietKyThi: any;
  idChiTietKyThi: number;
  idKT: number;
  idMonThi: number;
  idLopThi: number;
  ngayBatDau: Date;
  ngayKetThuc: Date;

  listKyThi_date: any;
  maxDate: any;
  minDate: any;
  editchitietkythi(id: number) {
    console.log("Da chay")
    this.httpService.getItem('chitietkythi', id).subscribe(response => {

      this.idChiTietKyThi = id;
      this.itemChiTietKyThi = response;
      this.idMonThi = this.itemChiTietKyThi.monThi.maMon
      this.idKT = this.itemChiTietKyThi.kyThi.maKyThi
      this.idLopThi = this.itemChiTietKyThi.lopThi.maLopThi
      this.tenMonArray();
      this.tenLopArray();
      this.ngayBatDau = new Date(this.itemChiTietKyThi.thoiGianBatDau);
      this.ngayKetThuc = new Date(this.itemChiTietKyThi.thoiGianKetThuc);

      const batDauFormatted = this.ngayBatDau.toLocaleString();
      const ketThucFormatted = this.ngayKetThuc.toLocaleString();

      this.myForm.get('thoiGianBatDau').setValue(batDauFormatted);
      this.myForm.get('thoiGianKetThuc').setValue(ketThucFormatted);

      this.myForm.get('thoiGianBatDau1').setValue(this.ngayBatDau);
      this.myForm.get('thoiGianKetThuc1').setValue(this.ngayKetThuc);
      this.myForm.get('tenMon').setValue(this.itemChiTietKyThi.monThi.tenMon);
      this.myForm.get('tenLop').setValue(this.itemChiTietKyThi.lopThi.tenLop);

      this.httpService.getItem('chitietkythi/kythi', this.idKT).subscribe(response => {
        this.listKTChitietkythi = response
      })


    })


  }

  //lấy dử liệu trên form về chuẩn bị upadata
  listKTChitietkythi: any;
  getdataFormEditChiTietKyThi() {
    //Bắt lỗi không thay đôi dử liệu mà vẫn bấm nút 

    const batDauFormatted = this.ngayBatDau.toLocaleString();
    const ketThucFormatted = this.ngayKetThuc.toLocaleString();


    if (this.myForm.get('tenMon').value.code === 0 && this.myForm.get('tenLop').value.code === 0 && this.myForm.get('thoiGianKetThuc').value === ketThucFormatted && this.myForm.get('thoiGianBatDau').value === batDauFormatted) {
      this.messageService.add({ severity: 'warn', summary: 'Thông báo', detail: 'Không có thay đổi để cập nhật chi tiết kỳ thi !' });
      return;
    }

    // // Lấy mã môn và mã lớp từ form
    const maMonForm = this.myForm.get('tenMon').value.code || this.itemChiTietKyThi.monThi.maMon;
    const maLopThiForm = this.myForm.get('tenLop').value.code || this.itemChiTietKyThi.lopThi.maLopThi;

    // Kiểm tra xem cặp mã môn và mã lớp đã tồn tại trong danh sách API hay chưa
    if (this.listKTChitietkythi && this.listKTChitietkythi.length > 0) {
      const isDuplicate = this.listKTChitietkythi.some(item => item.monThi.maMon === maMonForm && item.lopThi.maLopThi === maLopThiForm);

      if (isDuplicate) {
        this.messageService.add({ severity: 'error', summary: 'Thông báo lỗi', detail: 'Môn thi thuộc lớp thi này đã tồn tại trong kì thi này !' });
        return;
      } else {
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Thông báo lỗi', detail: 'Môn thi thuộc lớp thi này đã tồn tại trong kì thi này !' });
      return
    }
    const thoiGianBatDauDate = new Date(this.myForm.get('thoiGianBatDau').value)
    const thoiGianKetThucDate = new Date(this.myForm.get('thoiGianKetThuc').value)

    const dataChiTietKyThi = {
      maChiTietKyThi: this.idChiTietKyThi,
      thoiGianBatDau: thoiGianBatDauDate == null ? this.itemChiTietKyThi.thoiGianBatDau : thoiGianBatDauDate,
      thoiGianKetThuc: thoiGianKetThucDate == null ? this.itemChiTietKyThi.thoiGianKetThuc : thoiGianKetThucDate,

      monThi: {
        maMon: this.myForm.get('tenMon').value.code == 0 ? this.itemChiTietKyThi.monThi.maMon : this.myForm.get('tenMon').value.code,
      },
      lopThi: {
        maLopThi: this.myForm.get('tenLop').value.code == 0 ? this.itemChiTietKyThi.lopThi.maLopThi : this.myForm.get('tenLop').value.code,
      },
      kyThi: {
        maKyThi: this.idKT,
      }
    }

    this.httpService.putItem('chitietkythi', this.idChiTietKyThi, dataChiTietKyThi).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Cập nhật chi tiết kỳ thi thành công ' });

      setTimeout(() => {
        location.reload();
      }, 2000);

    }, (error) => {
      console.log("Lỗi khi cập nhật");

    })
  }

  // edit chi tiết kỳ thi
  updateChiTietKiThi() {
    if (this.myForm.invalid) {
      for (const control in this.myForm.controls) {
        if (this.myForm.controls.hasOwnProperty(control)) {
          this.myForm.controls[control].markAsTouched();
        }
      }
      return;
    }
    this.getdataFormEditChiTietKyThi()
  }

  // Đưa tên môn và tất cả môn lên để chỉnh sửa
  tenMonArray() {
    this.cities2 = [];

    if (typeof this.itemChiTietKyThi === 'object') {
      this.cities2.push({ name: "Chọn môn thi", code: 0 });
    }

    if (this.listMonThi) {
      // Lọc ra các mục không có cùng id với itemChiTietKyThi
      const filteredMonThi = this.listMonThi.filter(lop => lop.maMon !== this.itemChiTietKyThi.monThi.maMon);

      // Thêm các mục đã lọc vào selecttenmon
      this.selecttenmon = this.cities2.concat(filteredMonThi.map(lop => {
        return { name: lop.tenMon, code: lop.maMon };
      }));
    } else {
      this.selecttenmon = this.cities2;
    }


  }

  // Đưa tên lớp và tất cả lớp lên để chỉnh sửa
  tenLopArray() {
    this.cities2 = [];
    this.selecttenlop = [];

    if (typeof this.itemChiTietKyThi === 'object') {
      this.cities2.push({ name: "Chọn lớp thi", code: 0 });
    }

    if (this.listLopThi) {
      // Lọc ra các mục không có cùng id với itemChiTietKyThi
      const filteredLopThi = this.listLopThi.filter(lop => lop.maLopThi !== this.itemChiTietKyThi.lopThi.maLopThi);

      // Thêm các mục đã lọc vào selecttenlop
      this.selecttenlop = this.cities2.concat(filteredLopThi.map(lop => {
        return { name: lop.tenLop, code: lop.maLopThi };
      }));
    } else {
      this.selecttenlop = this.cities2;
    }
  }

  // Xóa chi tiết kỳ thi 
  deleteChiTietKyThi(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa môn thi này khỏi lớp thi không ?',
      header: 'Thông báo xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpService.deleteItem("chitietkythi", id).subscribe(data => {
          this.messageService.add({ severity: 'success', summary: 'Thông báo xóa chi tiết kỳ thi', detail: 'Xóa chi tiết kỳ thi thành công' });
          this.getItemChiTietKyThi(this.idItemKyThi, this.TimeStart, this.TimeEnd)
          this.getData();
          this.getDataLop();
          this.getDataMon();

          this.myFormMonThi.reset();

        }, error => {
          console.log("Xóa thất bại", error);
        });
      },

    });
  }


  // thêm các lớp vào môn thi
  listChitietkythi_monThi: any;
  selecttenmon_kythi: any[] = [];
  selecttenlop_kythi: any[] = [];
  selectMonThi() {
    this.httpService.getItem('chitietkythi/kythi/create', this.idItemKyThi).subscribe(data => {
      this.listChitietkythi_monThi = data;



      // Tạo danh sách môn học
      this.selecttenmon_kythi = this.listMonThi.filter(lop => {
        return this.listChitietkythi_monThi.some(item => item.monThi.maMon === lop.maMon);
      }).map(lop => {
        return { name: lop.tenMon, code: lop.maMon };
      });
    });

    this.httpService.getItem('kythi', this.idItemKyThi).subscribe(response => {
      this.listKyThi_date = response

      this.minDate = new Date(this.listKyThi_date.thoiGianBatDau)
      this.maxDate = new Date(this.listKyThi_date.thoiGianKetThuc)


    })


  }


  listKyThi_MonThi: any;
  // Khai báo một mảng chứa tất cả các lớp
  selectLopThi: any[] = [];

  // Hàm xử lý sự kiện khi thay đổi môn thi
  idMonThiItemm: number;
  toDay = new Date();
  maChiTietKyThiArray: [] = []
  onSelectChange(event: any) {

    this.idMonThiItemm = event.code;
    this.httpService.getItemss('chitietkythi/kythi', this.idItemKyThi, 'monthi', this.idMonThiItemm).subscribe(data => {
      this.listKyThi_MonThi = data;
      this.maChiTietKyThiArray = data.map(item => item.maChiTietKyThi);

      // Loại bỏ các lớp đã có trong listKyThi_MonThi
      this.selectLopThi = this.listLopThi.filter(classItem => {
        return !this.listKyThi_MonThi.some(item => item.lopThi && item.lopThi.maLopThi === classItem.maLopThi);
      });

      this.selectLopThi = this.selectLopThi.map(lop => {
        return { name: lop.tenLop, code: lop.maLopThi };
      });
    });
  }


  // Bắt lỗi thời gian
  errorMesssage: string;
  timeRangeValidator() {
    const startTime = this.myFormMonThi.get('thoiGianBatDau2').value
    const endTime = this.myFormMonThi.get('thoiGianKetThuc2').value
    if (startTime > endTime) {
      this.errorMesssage = 'Thời gian kết thúc phải lớn hơn thời gian bất đầu !'
      return;
    }
  }
  // Thêm Lớp vào môn học
  UpdateLopvaoMon() {
    // kiểm tra lỗi ấy mà
    if (this.myFormMonThi.invalid) {
      for (const control in this.myFormMonThi.controls) {
        if (this.myFormMonThi.controls.hasOwnProperty(control)) {
          this.myFormMonThi.controls[control].markAsTouched();
        }
      }
      return;
    }

    this.dataUpdataLopvaoMon()

  }

  // dử liệu và api để update
  dataUpdataLopvaoMon() {
    this.timeRangeValidator()
    // Lấy giá trị của `tenMon` từ `this.myForm`
    const selectedMon = this.myFormMonThi.get('tenLop2').value;
    // Tạo một danh sách dữ liệu chi tiết kỳ thi từ giá trị được chọn
    const dataChiTietKyThi_lopThi = selectedMon.map((lop) => ({
      thoiGianBatDau: this.myFormMonThi.get('thoiGianBatDau2').value,
      thoiGianKetThuc: this.myFormMonThi.get('thoiGianKetThuc2').value,
      kyThi: {
        maKyThi: this.idItemKyThi,
      },
      monThi: {
        maMon: this.idMonThiItemm
      },
      lopThi: {
        maLopThi: lop.code
      }
    }));

    // Duyệt qua từng mục và gửi lên API
    dataChiTietKyThi_lopThi.forEach((item) => {
      this.httpService.postItem('chitietkythi', item).subscribe((response) => {

      });
    });

    const maChiTietKyThiNull = this.listKyThi_MonThi
      .filter(item => item.lopThi === null)
      .map(item => item.maChiTietKyThi);
    this.httpService.deleteItem('chitietkythi', maChiTietKyThiNull).subscribe(data => {
    }, err => { console.log("Không có lỗi"); }
    )

    this.messageService.add({ severity: 'success', summary: 'Thông báo thêm môn thi vào kỳ thi', detail: 'Thông báo thêm môn thi vào kỳ thi thành công' });
    setTimeout(() => {
      location.reload();
    }, 2000);

  }

}