import { HashLocationStrategy, LocationStrategy, } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './Admin/containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { HttpClientModule } from '@angular/common/http';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { TableModule } from 'primeng/table';
import { ExamClassComponent } from './Admin/views/exam/exam-class/exam-class.component';
import { ExamSubjectsComponent } from './Admin/views/exam/exam-subjects/exam-subjects.component';
import { DefaultLayoutTeacherComponent } from './Teacher/containers-teacher/default-layout-teacher/default-layout-teacher.component';
import { TeacherFooterComponent } from './Teacher/containers-teacher/default-layout-teacher/teacher-footer/teacher-footer.component';
import { TeacherHeaderComponent } from './Teacher/containers-teacher/default-layout-teacher/teacher-header/teacher-header.component';
import { ManageStudentClassComponent } from './Teacher/views/manage-student/manage-student-class/manage-student-class.component';
import { ManageStudentHomeComponent } from './Teacher/views/manage-student/manage-student-event/manage-student-event.component';
import { ManageStudentSubjectComponent } from './Teacher/views/manage-student/manage-student-subject/manage-student-subject.component';
import { MainUserComponent } from './User/main-user/main-user.component';
import { AboutComponent } from './User/pages/about/about.component';
import { ContactComponent } from './User/pages/contact/contact.component';
import { HistoryComponent } from './User/pages/history/history.component';
import { HomeContentComponent } from './User/pages/home/home-content/home-content.component';
import { ReportComponent } from './Admin/views/report/report.component';
import { HomeHeaderComponent } from './User/pages/home/home-header/home-header.component';
import { HomeComponent } from './User/pages/home/home.component';
import { FooterComponent } from './User/sharepages/footer/footer.component';
import { NavbarComponent } from './User/sharepages/navbar/navbar.component';
import { ManageStudentPupilComponent } from './Teacher/views/manage-student/manage-student-pupil/manage-student-pupil.component';


import { TeacherComponent } from './Admin/views/account/teacher/teacher.component';
import { UserComponent } from './Admin/views/account/user/user.component';
import { ButtonModule } from 'primeng/button';
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  DefaultLayoutTeacherComponent,
  ManageStudentHomeComponent,
  ManageStudentSubjectComponent,
  ManageStudentClassComponent,
  ManageStudentPupilComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, MainUserComponent, NavbarComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent, TeacherHeaderComponent, TeacherFooterComponent, HistoryComponent, HomeHeaderComponent, HomeContentComponent, ReportComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    HttpClientModule,
    TableModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
