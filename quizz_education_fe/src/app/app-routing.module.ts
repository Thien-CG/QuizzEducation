import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './Admin/containers';
import { Page404Component } from './Admin/views/pages/page404/page404.component';
import { Page500Component } from './Admin/views/pages/page500/page500.component';
import { LoginComponent } from './Admin/views/pages/login/login.component';
import { RegisterComponent } from './Admin/views/pages/register/register.component';
import { MainUserComponent } from './User/main-user/main-user.component';
import { AboutComponent } from './User/pages/about/about.component';
import { HomeComponent } from './User/pages/home/home.component';
import { ContactComponent } from './User/pages/contact/contact.component';
import { DefaultLayoutTeacherComponent } from './Teacher/containers-teacher/index-teacher';
import { HistoryComponent } from './User/pages/history/history.component';
const routes: Routes = [
  {
    path: 'user',
    component: MainUserComponent,
    children: [
      { path: 'exam', component: AboutComponent },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'login', component: ContactComponent },
    ]
  }
  , {
    path: '',
    redirectTo: 'contest',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {

      title: 'Admin'

    },
    children: [

      {
        path: 'exam',
        loadChildren: () =>
          import('./Admin/views/exam/exam.module').then((m) => m.CoreUIExamModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./Admin/views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: 'teacher',
    component: DefaultLayoutTeacherComponent,
    data: {
      title: 'Admin'
    },
    children: [

      {
        path: 'forms',
        loadChildren: () =>
          import('./Teacher/views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },

      {
        path: 'pages',
        loadChildren: () =>
          import('./Teacher/views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  // {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
