import { HttpSvService } from 'src/app/service/API.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { TaiKhoan } from './../../../models/TaiKhoan.entity';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private modalService: NgbModal,
    private httpSvService: HttpSvService
  ) { }

  studentList: any[]
  noClassStudentList: any[]
  currentUser: any;

  ngOnInit(): void {
    this.getTokenFromLocalStorage();
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
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/lopThi?maLopThi=${this.currentUser.lopThi.maLopThi}`).subscribe(
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
    account.lopThi = this.currentUser.lopThi
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
  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })

  // Lấy dữ liệu người dùng từ Local Storage
  public getTokenFromLocalStorage(): any {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      const helper = new JwtHelperService();
      try {
        const decodedToken = helper.decodeToken(token);
        // Trích xuất dữ liệu từ trường 'sub'

        if (decodedToken.sub) {

          // Lấy dữ liệu từ Local Storage và gán cho biến user
          this.currentUser = JSON.parse(decodedToken.sub);

          //Đi tìm trong DB lấy ra đối tượng
          this.httpSvService.getItem('taikhoan', this.currentUser.tenDangNhap).subscribe((userData) => {
            this.currentUser = userData;
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
}
