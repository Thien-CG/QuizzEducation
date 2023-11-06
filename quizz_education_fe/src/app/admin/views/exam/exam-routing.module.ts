import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestComponent } from './contest/contest.component';
import { ExamClassComponent } from './exam-class/exam-class.component';


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
        redirectTo: 'contest'
      },
      {
        path: 'contest',
        component: ContestComponent,
        data: {
          title: 'Contest'
        }
      }, {
        path: 'exam-class',
        component: ExamClassComponent,
        data: {
          title: 'Exam Class'
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
