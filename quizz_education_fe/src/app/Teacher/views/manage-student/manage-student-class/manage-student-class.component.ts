import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-student-class',
  templateUrl: './manage-student-class.component.html',
  styleUrls: ['./manage-student-class.component.scss']
})
export class ManageStudentClassComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  public currentEvent: number;
  public currentSubject: number
  public classList: any[];
  public studentList: any[]

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      let id2 = params['id2'];
      this.currentEvent = id
      this.currentSubject = id2
    });
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/lopthi?kithi=${this.currentEvent}&monthi=${this.currentSubject}`)
      .subscribe(data => {
        this.classList = data
      });
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/hocsinh`)
      .subscribe(data => {
        this.studentList = data
      })
  }

  public getClassLength(classId: number) {
    return this.studentList.filter(s => s.lopThi && s.lopThi.maLopThi == classId).length
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }

  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
