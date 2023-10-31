import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-manage-student-result',
  templateUrl: './manage-student-result.component.html',
  styleUrls: ['./manage-student-result.component.scss']
})
export class ManageStudentResultComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  public currentEvent: number;
  public currentSubject: number;
  public currentStudent: string;
  public studentResult: any;
  public questionList: any[];
  public answerList: any[];
  public selectedAnswer: any[];
  public maximumMark: number = 0;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      let id2 = params['id2'];
      let id4 = params['id4'];
      this.currentEvent = id
      this.currentSubject = id2
      this.currentStudent = id4
    });
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/bocauhoi?tenDangNhap=${this.currentStudent}&maKiThi=${this.currentEvent}&maMon=${this.currentSubject}`)
      .subscribe(data => {
        this.studentResult = data
        this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/listCauHoi?maDeThi=${this.studentResult.deThi.maDeThi}`)
          .subscribe(data => {
            this.questionList = data
          })
        this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/dapanDeThi?maDeThi=${this.studentResult.deThi.maDeThi}`)
          .subscribe(data => {
            this.answerList = data
            for (let i = 0; i < this.answerList.length; i++) {
              this.maximumMark += this.answerList[i].diemDapAn
            }
          })
        this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/dapAnDaChon?maBoCauHoiDaLam=${this.studentResult.maBoCauHoiDaLam}`)
          .subscribe(data => {
            this.selectedAnswer = data
          })
      })
  }

  public answerInQuestion(questionId: number) {
    return this.answerList.filter(answer => answer.cauHoi.maCauHoi === questionId)
  }

  public checkSelectedAnswer(answerId: number): boolean {
    var object = this.selectedAnswer.find(answer => answer.dapAn.maDapAn === answerId);
    if (object) {
      return true
    } else {
      return false
    }
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
