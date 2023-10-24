import { Component, OnInit } from '@angular/core';
import { HttpSvService } from '../../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-teacher-allot',
  templateUrl: './teacher-allot.component.html',
  styleUrls: ['./teacher-allot.component.scss']
})
export class TeacherAllotComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup
  constructor(private httpService: HttpSvService, private http: HttpClient,
    private formBuilder: FormBuilder, private fb: FormBuilder, private messageService: MessageService) { }

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
}