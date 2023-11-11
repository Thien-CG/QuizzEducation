import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpSvService } from 'src/app/service/API.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ExamComponent implements OnDestroy {
  constructor(
    private router: Router,
    private httpSvService: HttpSvService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    if (this.response) {
      this.setTime();
    }
  }

  ngOnInit() {
    this.index = 0;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTokenFromLocalStorage();
    this.getData();
    window.addEventListener('online', () => {
      // alert('1')
    });
    window.addEventListener('offline', () => {
      alert('2')

    });
  }

  private getTokenFromLocalStorage(): any {
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

  //! Khai báo các biến ở đây ----------------------------------------------------------------------
  private user: any;

  private id: any;

  deThi: any; // lưu đề thi

  deThi2: any; // lưu tạm đề thi để so sánh xem có sự thay đổi hay không

  cauHoi: any; // lưu câu hỏi trong đề đang được hiển thị lên

  index: number; // lưu vị trí câu hỏi hiện tại

  soCauDaLam: number; // lưu số câu đã làm xong

  response: any;

  chuCai = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

  displayTime: string = '';// đồng hồ đã định dạng


  //! Các funtion ở đây ----------------------------------------------------------------------

  //! Gửi API lưu thời gian khi học sinh thoát hoặc reload lại trang web
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    this.setTime();
  }

  confirm() {
    if (this.check() !== -1) {
      //! Hiển thị thông  báo xác nhận khi chưa hoàn thành bài thi
      Swal.fire({
        title: "Nộp bài?",
        text: "Bạn vẫn chưa hoàn thành bài thi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vẫn nộp bài!",
        cancelButtonText: "Hủy"
      }).then((result) => {
        if (result.isConfirmed) {
          this.response.daNop = true;
          this.setTime().then((result) => {
            this.alert("Nộp bài thành công", "success").then((result) => {
              if (result === true) {
                this.router.navigate(['/user/home']);
              }
            });
          });
        }
      });
    } else {
      //! Đã hoàn thành và tiến hành gửi API lưu thời gian
      this.response.daNop = true;
      this.setTime().then((result) => {
        this.alert("Nộp bài thành công", "success").then((result) => {
          this.router.navigate(['/user/home']);
        });

      });
    }
  }


  //! Thông báo dạng sweetalert
  private async alert(text, icon) {
    let check = false;
    await Swal.fire({
      title: 'Thông báo',
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        //! Xử lý nộp bài thành công
        check = true;
      }
    });
    return check;
  }


  //! Gửi API để set thời gian làm bài của học sinh
  private async setTime() {
    let check: boolean = false;
    const API_LOGIN = 'http://localhost:8080/quizzeducation/api/boCauHoiDaLam/nopBai';
    const request = this.httpClient.post(API_LOGIN, this.response);
    request.subscribe(
      (response) => {
        check = true;
      },
      error => {
        this.alert('Lỗi kết nối server!', error);
      }
    );
    return check;
  }

  //!Lấy data về từ API
  public getData() {
    this.httpSvService.getList(`boCauHoiDaLam/${this.user.tenDangNhap}/` + this.id).subscribe(
      (response) => {
        if (response.coTheThi) {
          this.response = _.cloneDeep(response);
          this.deThi = _.cloneDeep(response.boCauHoiDaLam.deThi.cauHois);
          this.index = this.check();
          if (this.index === -1) {
            this.index = 0;
          }
          this.getCauHoi(this.index);
          this.setSoCauDaLam();
          let timeFromDB = response.thoiGianLamBai;
          const intervalId = setInterval(() => {
            timeFromDB--;
            this.displayTime = this.formatTime(timeFromDB);
            if (timeFromDB <= 0) {
              clearInterval(intervalId);
              this.setTime();
              this.alert('Hết thời gian làm bài', 'error').then((result) => {
                if (result) {
                  this.router.navigate(['/user/home']);
                }
              });
            }
          }, 1000);
        } else {
          this.alert('Kỳ thi đã đóng', 'error').then((result) => {
            if (result) {
              this.router.navigate(['/user/home']);
            }
          });
        }

      },
      error => {
        let e = error.error;
        console.log("🚀 ~ file: exam.component.ts:183 ~ ExamComponent ~ getData ~ e:", e)
        if (e.status) {
          this.alert('Lỗi không xác định', 'error').then((result) => {
            if (result) {
              this.router.navigate(['/user/home']);
            }
          });
        } else {
          this.alert(e, 'error').then((result) => {
            if (result) {
              this.router.navigate(['/user/home']);
            }
          });
        }
      }

    )
  }


  //! lấy câu hỏi trong đề
  public getCauHoi(index: number) {
    this.cauHoi = this.deThi[index];
  }


  //! chuyển sang câu hỏi khác
  public chuyenCauHoi(i: number) {
    this.index = i;
    this.getCauHoi(this.index);
  }


  //! set số lượng câu hỏi đã làm
  public setSoCauDaLam() {
    this.soCauDaLam = 0;
    this.deThi.forEach((cauHoi: { daChon: boolean; }) => {
      if (cauHoi.daChon === true) {
        this.soCauDaLam++;
      }
    });
  }


  //! Hàm trả về giá trị đầu tiên của câu chưa làm
  private check() {
    let i = 0;
    let i2 = -1;
    for (let cauHoi of this.deThi) {
      if (cauHoi.daChon === false) {
        i2 = i;
        break;
      }
      i++;
    }
    return i2;
  }


  //! onchange Radio đáp án
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
        this.alert('Lỗi kết nối server!', 'error');
      }
    );

  }


  //! onchange Checkbox đáp án
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
      },
      error => {
        this.alert('Lỗi kết nối server!', 'error');
      }
    );



  }


  //! format thời gian
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
