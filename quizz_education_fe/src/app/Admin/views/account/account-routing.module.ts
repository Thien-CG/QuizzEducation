import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TeacherComponent } from './teacher/teacher.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Người dùng'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'teacher'
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        data: {
          title: 'Teacher'
        }
      },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
