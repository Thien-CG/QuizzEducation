import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-student-pupil',
  templateUrl: './manage-student-pupil.component.html',
  styleUrls: ['./manage-student-pupil.component.scss']
})
export class ManageStudentPupilComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  public currentEvent: number;
  public currentSubject: number
  public currentClass: number
  public studentList: any[]
  public resultList: any[]
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      let id2 = params['id2'];
      let id3 = params['id3'];
      this.currentEvent = id
      this.currentSubject = id2
      this.currentClass = id3
    });
    this.getStudentList();
    this.getResultList();
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public getStudentList() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/lopThi?maLopThi=${this.currentClass}`)
      .subscribe(data => {
        this.studentList = data
      })
  }

  public getResultList() {
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/bocauhoidalam`)
      .subscribe(data => {
        this.resultList = data
      })
  }

  public checkDone(username: string): boolean {
    for (var i = 0; i < this.resultList.length; i++) {
      if (this.resultList[i].deThi.chiTietKyThi.kyThi.maKyThi == this.currentEvent && this.resultList[i].deThi.chiTietKyThi.monThi.maMon == this.currentSubject
        && this.resultList[i].taiKhoan.tenDangNhap === username) {
        return true
      }
    }
    return false
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
