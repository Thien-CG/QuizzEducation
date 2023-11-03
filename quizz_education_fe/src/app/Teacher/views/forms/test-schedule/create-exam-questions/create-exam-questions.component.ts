import { Component, OnInit } from '@angular/core';
import { accountStudent } from './../../../../../classes/Admin/account/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpSvService } from '../../../../../service/API.service';
import { Observable, map, mergeMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';
interface Exam {
  
  questions: any[];
}
@Component({
  selector: 'app-create-exam-questions',
  templateUrl: './create-exam-questions.component.html',
  styleUrls: ['./create-exam-questions.component.scss'],

})

export class CreateExamQuestionsComponent implements OnInit{
  constructor(private fb: FormBuilder, private httpService: HttpSvService, private http: HttpClient,private formBuilder: FormBuilder) 
  {
    
  }
  formGroup: FormGroup | undefined;
  date: Date | undefined;
  ngOnInit() {
    this.getDeThi();
    this.getQuestions();
  
};
exam: Exam = { 
  questions: []
};
monThi: any[] = [];
dethi: any[] = [];
questions: any[] = [];
getQuestions() {
  this.httpService.getList('cauhoi').subscribe(data => {
    this.questions = data;
  });
}
getDeThi() {
  this.httpService.getList('dethi').subscribe(data => {
    this.dethi = data;
  });
}
toggleSelection(question: any) {
  const index = this.exam.questions.findIndex(q => q.maCauHoi === question.maCauHoi);

  if (index > -1) {
    this.exam.questions.splice(index, 1); // Xóa câu hỏi nếu đã chọn
  } else {
    this.exam.questions.push(question); // Thêm câu hỏi nếu chưa chọn
  }
}

createExam() {
  

 
  // Thực hiện các thao tác cần thiết với đề thi đã chọn
  console.log(this.exam);
}

}

