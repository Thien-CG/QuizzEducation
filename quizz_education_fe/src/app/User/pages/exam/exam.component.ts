import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpSvService } from 'src/app/service/API.service';
import * as _ from 'lodash';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { error } from 'console';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent {
  constructor(
    private router: Router,
    private httpSvService: HttpSvService,
    private httpClient: HttpClient,
  ) { }

  public user: any;
  ngOnInit(): void {
    this.index = 0;
    this.getTokenFromLocalStorage();
    this.getData();
  }

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
          this.httpSvService.getItem('taikhoan', this.user.tenDangNhap).subscribe((userData) => {
            this.user = userData;
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

  //Khai báo các biến ở đây

  deThi: any; // lưu đề thi

  deThi2: any; // lưu tạm đề thi để so sánh xem có sự thay đổi hay không

  cauHoi: any; // lưu câu hỏi trong đề đang được hiển thị lên

  index: number; // lưu vị trí câu hỏi hiện tại

  soCauDaLam: number; // lưu số câu đã làm xong

  response: any;

  chuCai = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  displayTime: string = '';// đồng hồ đã định dạng



  //Lấy data về từ API
  public getData() {
    this.httpSvService.getList(`boCauHoiDaLam/${this.user.tenDangNhap}/2`).subscribe(
      (response) => {
        this.response = _.cloneDeep(response);
        this.deThi = _.cloneDeep(response.boCauHoiDaLam.deThi.cauHois);
        this.deThi2 = _.cloneDeep(this.deThi);
        this.getCauHoi(this.index);
        this.setSoCauDaLam();
        let timeFromDB = response.thoiGianLamBai;
        const intervalId = setInterval(() => {
          timeFromDB--;
          this.displayTime = this.formatTime(timeFromDB);
          if (timeFromDB <= 0) {
            clearInterval(intervalId);
            this.displayTime = 'Hết thời gian!';
            // Thực hiện sự kiện khi hết thời gian
          }
        }, 1000);
      },
      error => {
        let e = error.error;
        alert(e);
      }

    )
  }

  // lấy câu hỏi trong đề
  public getCauHoi(index: number) {
    this.cauHoi = this.deThi[index];
  }

  // chuyển sang câu hỏi khác
  public chuyenCauHoi(i: number) {
    this.index = i;
    this.getCauHoi(this.index);
    console.log("🚀 this.cauHoi 1:", this.cauHoi)
  }


  // set số lượng câu hỏi đã làm
  public setSoCauDaLam() {
    this.soCauDaLam = 0;
    this.deThi.forEach(cauHoi => {
      if (cauHoi.daChon === true) {
        this.soCauDaLam++;
      }
    });
    console.log("🚀 this.deThi 2:", this.deThi)
  }


  // onchange Radio đáp án
  public onChangRadio(event: Event, i: number) {
    this.response.dapAn = this.cauHoi.dapAns[i];
    this.response.cauHoi = _.cloneDeep(this.cauHoi);
    const API_LOGIN = 'http://localhost:8080/quizzeducation/api/boCauHoiDaLam';
    const request = this.httpClient.post(API_LOGIN, this.response);

    request.subscribe(
      (response) => {
        this.cauHoi.daChon = true;

        this.cauHoi.dapAns.forEach(dapAn => {
          dapAn.daChon = false;
        });

        this.cauHoi.dapAns[i].daChon = true;

        this.setSoCauDaLam();

      },
      error => {
        console.log("🚀 ~ file: exam.component.ts:151 ~ ExamComponent ~ onChangRadio ~ error:", error)
      }
    );

  }


  // onchange Checkbox đáp án
  public onChangCheckBox(event: Event, i: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    this.response.dapAn = this.cauHoi.dapAns[i];
    this.response.cauHoi = _.cloneDeep(this.cauHoi);
    if (isChecked) {
      this.response.xoa = false;
    } else {
      this.response.xoa = true;
    }
    const API_LOGIN = 'http://localhost:8080/quizzeducation/api/boCauHoiDaLam';
    const request = this.httpClient.post<any>(API_LOGIN, this.response);

    request.subscribe(
      (response) => {
      }
    );


    if (this.cauHoi.daChon === false) {
      this.cauHoi.daChon = true;
    }

    if (isChecked) {
      this.cauHoi.dapAns[i].daChon = true;
    } else {
      this.cauHoi.dapAns[i].daChon = false;
    }

    let check = false;
    this.cauHoi.dapAns.forEach(dapAn => {
      if (dapAn.daChon === true) {
        check = true;
      }
    });
    if (check === false) {
      this.cauHoi.daChon = false;
    }
    this.setSoCauDaLam();
  }


  // format thời gian
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
