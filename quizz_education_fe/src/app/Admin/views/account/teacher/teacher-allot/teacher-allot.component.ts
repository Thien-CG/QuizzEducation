import { Component, OnInit } from '@angular/core';
import { HttpSvService } from '../../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-teacher-allot',
  templateUrl: './teacher-allot.component.html',
  styleUrls: ['./teacher-allot.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class TeacherAllotComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup
  constructor(private httpService: HttpSvService, private http: HttpClient, private ConfirmationService: ConfirmationService,
    private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService) {
    this.myForm = this.fb.group({
      tengiaovien: ['', [Validators.required]],
      tenkythi: ['', [Validators.required]],
      tenmonthi: ['', [Validators.required]],
      thoihan: ['', [Validators.required]],
      trangthai: ['', [Validators.required]],
      makythi: ['', [Validators.required]],
      mamon: ['', [Validators.required]],
      tendangnhap: ['', [Validators.required]],

      gettengiaovien: ['', [Validators.required]],
      gettenkythi: ['', [Validators.required]],
      gettenmonthi: ['', [Validators.required]],
      getthoihan: ['', [Validators.required]],
      gettrangthai: ['', [Validators.required]],
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


  ngOnInit(): void {
    this.getData();
    this.getDataTecher();
    this.getDataKyThi();
    this.getDataMonThi();
  }

  listAllot: any;
  getData() {
    this.httpService.getList('phancong').subscribe(response => {
      this.listAllot = response
    }, error => {
      console.log("lỗi khi lấy dử liệu");
    })
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

  // Xóa phân công
  deletePhanCong(idPhanCong: number) {
    this.httpService.deleteItem('phancong', idPhanCong).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Xóa thành công ', detail: 'Xóa phân công thành công !' });

      this.getData();
    }, error => {
      this.showError()
    })
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Xóa thất bại', detail: 'Xóa phân công thật bại !' });
  }

  confirm1(idPhanCong: number) {
    this.ConfirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ?',
      header: 'Cảnh báo xóa phân công',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.deletePhanCong(idPhanCong);
      }
    });
  }



  // tạo phân công
  minDate = new Date();
  errorMesssage: string = '';

  createPhanCong() {
    // Lấy thông tin kỳ thi
    this.httpService.getList('phancong').subscribe((danhSachPhanCong) => {
      const tenMonThiCanKiemTra = this.myForm.get('tenmonthi').value.value;
      const tenKyThiCanKiemTra = this.myForm.get('tenkythi').value.value;

      // Kiểm tra xem môn thi và kì thi có tồn tại trong danh sách phân công không
      const monThiDaDuocPhanCong = danhSachPhanCong.some((phanCong) => {
        return phanCong.monThi.maMon === tenMonThiCanKiemTra && phanCong.kyThi.maKyThi === tenKyThiCanKiemTra;
      });

      if (monThiDaDuocPhanCong) {
        this.errorMesssage = "Môn thi đã được phân công trong kỳ thi.";
      } else {

        // Môn thi chưa tồn tại trong kỳ thi, bạn có thể tạo phân công
        const dataPhanCong = {
          daTaoDe: 0,
          thoiHan: this.myForm.get('thoihan').value,
          kyThi: {
            maKyThi: this.myForm.get('tenkythi').value.value,
          },
          monThi: {
            maMon: this.myForm.get('tenmonthi').value.value,
          },
          taiKhoan: {
            tenDangNhap: this.myForm.get('tengiaovien').value.value,
          },
        };

        this.httpService.postItem('phancong', dataPhanCong).subscribe(
          (data) => {
            // this.showSussceCreate();
            setTimeout(() => {
              location.reload();
            }, 2000);
          },
          (err) => {
            this.showError();
          }
        );
      }
    });
  }



  // chỉnh sửa thông tin phân công
  itemPhanCong: any;
  idPhanCong: any;
  editTeacher(id: number) {
    this.httpService.getItem('phancong', id).subscribe(response => {
      this.itemPhanCong = response;
      this.idPhanCong = id
      this.myForm.get('tenkythi').setValue(this.itemPhanCong.kyThi.tenKyThi);
      this.myForm.get('makythi').setValue(this.itemPhanCong.kyThi.maKyThi);
      this.myForm.get('tenmonthi').setValue(this.itemPhanCong.monThi.tenMon);
      this.myForm.get('mamon').setValue(this.itemPhanCong.monThi.maMon);
      this.myForm.get('tengiaovien').setValue(this.itemPhanCong.taiKhoan.hoVaTen);
      this.myForm.get('tendangnhap').setValue(this.itemPhanCong.taiKhoan.tenDangNhap);
      this.myForm.get('thoihan').setValue(this.itemPhanCong.thoiHan);
      this.myForm.get('trangthai').setValue(this.itemPhanCong.daTaoDe);

    });
  }

  updatePhanCong() {
    const dataPhanCong = {
      maPhanCong: this.idPhanCong,
      daTaoDe: this.myForm.get('trangthai').value,
      thoiHan: this.myForm.get('getthoihan').value ? this.myForm.get('getthoihan').value : this.myForm.get('thoihan').value,
      kyThi: this.myForm.get('gettenkythi').value ? { maKyThi: this.myForm.get('gettenkythi').value.value } : { maKyThi: this.myForm.get('makythi').value },
      monThi: this.myForm.get('gettenmonthi').value ? { maMon: this.myForm.get('gettenmonthi').value.value } : { maMon: this.myForm.get('mamon').value },
      taiKhoan: this.myForm.get('gettengiaovien').value ? { tenDangNhap: this.myForm.get('gettengiaovien').value.value } : { tenDangNhap: this.myForm.get('tendangnhap').value },
    };

    this.httpService.putItem('phancong', this.idPhanCong, dataPhanCong).subscribe(response => {

      this.messageService.add({ severity: 'success', summary: 'Cập nhật phân công thành công', detail: 'Cập nhật phân công cho giáo viên thành công' });

      setTimeout(() => {
        location.reload();
      }, 2000);
    });


  }
}