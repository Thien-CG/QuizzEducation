import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestComponent } from './contest/contest.component';
import { ExamClassComponent } from './exam-class/exam-class.component';
import { ExamSubjectsComponent } from './exam-subjects/exam-subjects.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Kỳ thi'

    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'exam-subjects'
      },
      {
        path: 'exam-subjects',
        component: ExamSubjectsComponent,
        data: {
          title: 'Môn thi'
        }
      },

      {
        path: 'contest',
        component: ContestComponent,
        data: {
          title: 'Đợt thi'
        }
      }, {
        path: 'exam-class',
        component: ExamClassComponent,
        data: {
          title: 'Lớp thi'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
