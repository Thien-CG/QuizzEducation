import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestScheduleComponent } from './test-schedule/test-schedule.component';
import { CreateExamQuestionsComponent } from './test-schedule/create-exam-questions/create-exam-questions.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'form'
      },
      {
        path: 'form',
        component: CreateExamQuestionsComponent,
      },
      {
        path: 'test-schedule',
        component: TestScheduleComponent,
        data: {
          title: 'Test-schedule'
        }
      },
      {
        path: 'mon/:id/monthi',
        component: CreateExamQuestionsComponent,
      },
      {
        path: 'mon/:id/monthi/:id2/kithi',
        component: CreateExamQuestionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
