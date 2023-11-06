import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestComponent } from './contest/contest.component';
import { ExamClassComponent } from './exam-class/exam-class.component';


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
        redirectTo: 'contest'
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
