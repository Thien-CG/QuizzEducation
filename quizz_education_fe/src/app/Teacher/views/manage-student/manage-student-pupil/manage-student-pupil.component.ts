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
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      let id2 = params['id2'];
      let id3 = params['id3'];
      this.currentEvent = id
      this.currentSubject = id2
      this.currentClass = id3

    });
    this.httpClient.get<[]>(`http://localhost:8080/quizzeducation/api/taikhoan/lopThi?maLopThi=${this.currentClass}`)
      .subscribe(data => {
        this.studentList = data
      })
  }

  public getValueSearch() {
    return this.formFilter.get('search')?.value;
  }
  public formFilter = this.formBuilder.group({
    setRows: new FormControl(5),
    search: new FormControl('')
  })
}
