import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { TaiKhoan } from './../../../models/TaiKhoan.entity';

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.scss'],
  providers: [MessageService]
})
export class ManageClassComponent implements OnInit {
  @ViewChild('confirmModal') confirmModal: ElementRef;
  @ViewChild('noClassModal') noClassModal: ElementRef;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private modalService: NgbModal
  ) { this.sessionUser = this.getSessionUser(); }

  studentList: any[]
  noClassStudentList: any[]


  private userKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5EYW5nTmhhcCI6IkNoYXVNYW5oVGFuIiwibWF0S2hhdSI6IjEyMyIsInRyYW5nVGhhaSI6dHJ1ZSwiZW1haWwiOiJDaGF1TWFuaFRhbkBnbWFpbC5jb20iLCJjYW5DdW9jQ29uZ0RhbiI6IjIzMTg4ODQ0NDU1NSIsImhvVmFUZW4iOiJDaMOidSBN4bqhbmggVOG6pW4iLCJnaW9pVGluaCI6dHJ1ZSwibmdheVNpbmgiOiIyMDAxLTAyLTE2IiwiZGlhQ2hpIjoiQ-G6p24gVGjGoSIsInNvRGllblRob2FpIjoiMDkxNzc3Nzc3NyIsIm5nYXlUYW9UYWlLaG9hbiI6IjIwMjMtMDktMzAiLCJhbmhEYWlEaWVuIjoiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9xdWl6emVkdWNhdGlvbi1lYWVhMy5hcHBzcG90LmNvbS9vL2ltYWdlcyUyRkNoYXVNYW5oVGFuLmpwZz9hbHQ9bWVkaWEmdG9rZW49OGYwZGM5OWYtOTI3Zi00NDBlLTlhNTAtYTA1NWUwZDg5OWUyIiwibG9wVGhpIjp7Im1hTG9wVGhpIjoxLCJ0ZW5Mb3AiOiJM4bubcCA4QTEiLCJzb0x1b25nVG9pRGEiOjMwfSwidmFpVHJvIjp7Im1hVmFpVHJvIjoxLCJ0ZW5WYWlUcm8iOiJI4buNYyBzaW5oIn19.yQ9FkTgZVPcme_W1NrpS3H6-b-qs9KXlp_9gJrgNgno'
  private sessionUser: any;
  user: any;
  ngOnInit(): void {
    this.setUserData();
    this.user = this.getLocalUser();
    this.getStudentList()
  }

  confirmDelete(account: TaiKhoan) {
    this.modalService
      .open(this.confirmModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
    document.querySelector('#confirmDelete').addEventListener('click', (e: Event) => this.deleteStudent(account));
  }

  getStudentList() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/lopThi?maLopThi=${this.user.lopThi.maLopThi}`).subscribe(
      (response) => {
        this.studentList = response
      },
      (error) => {
        console.log(error)
      }
    );
  }

  openNoClass() {
    this.modalService
      .open(this.noClassModal, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
      })
    this.getStudentNotHaveClass();
  }

  getStudentNotHaveClass() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/noClass`).subscribe(
      (response) => {
        this.noClassStudentList = response
      },
      (error) => {
        console.log(error)
      }
    );
  }

  addStudent(account: TaiKhoan): void {
    account.lopThi = this.user.lopThi
    this.httpClient.put(`http://localhost:8080/quizzeducation/api/taikhoan/${account.tenDangNhap}`, account).subscribe(
      (response) => {
        this.getStudentNotHaveClass();
        this.getStudentList();
        this.messageService.clear();
        this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Thông báo', detail: 'Thêm thành công' });
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  deleteStudent(account: TaiKhoan): void {
    account.lopThi = null;
    this.httpClient.put(`http://localhost:8080/quizzeducation/api/taikhoan/${account.tenDangNhap}`, account).subscribe(
      (response) => {
        this.getStudentList();
        this.messageService.clear();
        this.messageService.add({ key: 'toast1', severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công' });
      },
      (error) => {
        console.log(error.message);
      }
    )
  }
  // Lưu dữ liệu người dùng vào Local Storage
  setLocalUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  // Lưu dữ liệu người dùng vào Session Storage
  setSessionUser(user: any): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.sessionUser = user;
  }
  // Lấy dữ liệu người dùng từ Local Storage
  getLocalUser(): any {
    const userString = localStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  // Lấy dữ liệu người dùng từ Session Storage
  getSessionUser(): any {
    if (this.sessionUser) {
      return this.sessionUser;
    }
    const userString = sessionStorage.getItem(this.userKey);
    return userString ? JSON.parse(userString) : null;
  }

  // Xóa dữ liệu người dùng khỏi Local Storage
  removeLocalUser(): void {
    localStorage.removeItem(this.userKey);
  }

  // Xóa dữ liệu người dùng khỏi Session Storage
  removeSessionUser(): void {
    sessionStorage.removeItem(this.userKey);
    this.sessionUser = null;
  }

  setUserData(): void {
    const user = {
      "tenDangNhap": "ChauManhTan",
      "matKhau": "123",
      "trangThai": true,
      "email": "ChauManhTan@gmail.com",
      "canCuocCongDan": "231888444555",
      "hoVaTen": "Châu Mạnh Tấn",
      "gioiTinh": true,
      "ngaySinh": "2001-02-16",
      "diaChi": "Cần Thơ",
      "soDienThoai": "0917777777",
      "ngayTaoTaiKhoan": "2023-09-30",
      "anhDaiDien": "https://firebasestorage.googleapis.com/v0/b/quizzeducation-eaea3.appspot.com/o/images%2FChauManhTan.jpg?alt=media&token=8f0dc99f-927f-440e-9a50-a055e0d899e2",
      "lopThi": {
        "maLopThi": 1,
        "tenLop": "Lớp 8A1",
        "soLuongToiDa": 30
      },
      "vaiTro": {
        "maVaiTro": 1,
        "tenVaiTro": "Học sinh"
      }
    }
    this.setLocalUser(user);
    this.setSessionUser(user);
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
