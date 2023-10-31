import { HashLocationStrategy, LocationStrategy, } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from './../environments/environment';
import { ManageStudentResultComponent } from './Teacher/views/manage-student/manage-student-result/manage-student-result.component';

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

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { TableModule } from 'primeng/table';
import { ReportComponent } from './Admin/views/report/report.component';
import { DefaultLayoutTeacherComponent } from './Teacher/containers-teacher/default-layout-teacher/default-layout-teacher.component';
import { TeacherFooterComponent } from './Teacher/containers-teacher/default-layout-teacher/teacher-footer/teacher-footer.component';
import { TeacherHeaderComponent } from './Teacher/containers-teacher/default-layout-teacher/teacher-header/teacher-header.component';
import { ManageStudentClassComponent } from './Teacher/views/manage-student/manage-student-class/manage-student-class.component';
import { ManageStudentHomeComponent } from './Teacher/views/manage-student/manage-student-event/manage-student-event.component';
import { ManageStudentPupilComponent } from './Teacher/views/manage-student/manage-student-pupil/manage-student-pupil.component';
import { ManageStudentSubjectComponent } from './Teacher/views/manage-student/manage-student-subject/manage-student-subject.component';
import { MainUserComponent } from './User/main-user/main-user.component';
import { HistoryComponent } from './User/pages/history/history.component';
import { HomeContentComponent } from './User/pages/home/home-content/home-content.component';
import { HomeHeaderComponent } from './User/pages/home/home-header/home-header.component';
import { HomeComponent } from './User/pages/home/home.component';
import { FooterComponent } from './User/sharepages/footer/footer.component';
import { NavbarComponent } from './User/sharepages/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ManageClassComponent } from './Teacher/views/manage-class/manage-class.component';
import { ScoreComponent } from './User/pages/score/score.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { ExamComponent } from './User/pages/exam/exam.component';
import { ForgotPasswordComponent } from './Admin/views/pages/forgot-password/forgot-password.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
  DefaultLayoutTeacherComponent,
  ManageStudentHomeComponent,
  ManageStudentSubjectComponent,
  ManageStudentClassComponent,
  ManageStudentPupilComponent,
  ManageStudentResultComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    MainUserComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ScoreComponent,
    TeacherHeaderComponent,
    TeacherFooterComponent,
    HistoryComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    ReportComponent,
    ManageClassComponent,
    ForgotPasswordComponent,
    ExamComponent
  ],
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
    FormsModule,
    TableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ToastModule,
    NgbModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      // provide: PathLocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
