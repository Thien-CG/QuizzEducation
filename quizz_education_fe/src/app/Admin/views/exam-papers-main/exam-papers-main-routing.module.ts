import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamAnswerComponent } from './exam-answer/exam-answer.component';
import { ExamPapersComponent } from './exam-papers/exam-papers.component';
import { ExamClassComponent } from '../exam/exam-class/exam-class.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kì thi'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'exam-subjects'
      },
      {
        path: 'exam-answer',
        component: ExamAnswerComponent,
        data: {
          title: 'Exam Answer'
        }
      },{
        path: 'exam-request',
        component: ExamClassComponent,
        data: {
          title: 'Exam Request'
        }
      }
    ]
  },
  {
    path: 'profile-admin',
    component: ExamPapersComponent,
    data: {
      title: 'Thông tin cá nhân'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPapersMainRoutingModule {
}
 