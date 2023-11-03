import { OnDestroy, Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpSvService } from '../../../../service/API.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, FormBuilder ,AbstractControl} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api'
@Component({
  selector: 'app-test-schedule',
  templateUrl: './test-schedule.component.html',
  styleUrls: ['./test-schedule.component.scss'],
  providers: [MessageService]
})
export class TestScheduleComponent implements OnInit {
  myForm: FormGroup; // Khai báo FormGroup

  constructor(private renderer: Renderer2, private httpService: HttpSvService, private http: HttpClient,
   private fb: FormBuilder,private messageService: MessageService) {
 

      this.myForm = this.fb.group({
        maPhanCong: [''],       
        daTaoDe: ['', ],
        selectedthoiGianBatDau: ['', [Validators.required]],
        selectedthoiGianKetThuc: ['', [Validators.required]],
        selectedKyThi:  ['', [Validators.required]],
        selectedMonThi:  ['', [Validators.required]],
      });
    }


  ngOnInit(): void {
    this.getTokenFromLocalStorage();
    this.getData();
   
}

listContest: any;
user: any;
maphancong: number;

editTeacher(maphancong: number) {
  this.httpService.getItem('phancong', maphancong).subscribe(response => {  
    this.listContest = response;
    this.maphancong = maphancong;   
    this.myForm.get('maPhanCong').setValue(this.listContest.maPhanCong);  
    this.myForm.get('selectedthoiGianBatDau').setValue(this.listContest.kyThi.thoiGianBatDau);
    this.myForm.get('selectedthoiGianKetThuc').setValue(this.listContest.kyThi.thoiGianKetThuc);
    this.myForm.get('daTaoDe').setValue(this.listContest.daTaoDe);
    this.myForm.get('selectedKyThi').setValue(this.listContest.kyThi.tenKyThi);
    this.myForm.get('selectedMonThi').setValue(this.listContest.monThi.tenMon);
  });
}
updataThongTin() {
  const data = {
    maPhanCong: this.maphancong,
    daTaoDe: this.myForm.get('daTaoDe').value,
    kyThi : {
      tenKyThi: this.myForm.get('selectedKyThi').value.value,
      thoiGianBatDau: this.myForm.get('selectedKyThi').value.value,
      thoiGianKetThuc: this.myForm.get('selectedKyThi').value.value,
    },
    monThi : {
      tenMon: this.myForm.get('selectedMonThi').value.value,
    }
 
  }

  


  this.httpService.putItem('phancong', this.maphancong, data).subscribe(response => {
    this.showSussce()
    setTimeout(() => {
      location.reload();
    }, 2000);
  },
    error => {
      console.log('Lỗi không sát định', error)
      this.showError()
    });
}
daTaoDe: any[] = [
  { label: 'Đã tạo đề', value: 'true' },
  { label: 'Chưa tạo đề', value: 'false' }
];


public getValueSearch() {
  return this.formFilter.get('search')?.value;
}
public formFilter = this.fb.group({
  setRows: new FormControl(5),
  search: new FormControl('')
})

getData() {
    this.httpService.getList(`phancong/taikhoan/${this.user.tenDangNhap}`).subscribe(
      (response) => {
        this.listContest = response;
        console.log(this.listContest);
        
      }
    );
 
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
  this.messageService.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Cập nhật thành công' });
}
showError() {
  this.messageService.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Cập nhật  thất bại !' });
}
}


