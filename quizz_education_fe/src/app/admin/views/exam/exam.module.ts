import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';

import {
  ButtonGroupModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsRoutingModule } from './exam-routing.module';
import { ExamSubjectsComponent } from './exam-subjects/exam-subjects.component';
import { ExamClassComponent } from './exam-class/exam-class.component';
import { TableContestComponent } from './contest/table-contest/table-contest.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ContestComponent } from './contest/contest.component';
import { ContestCreateComponent } from './contest/table-contest/contest-create/contest-create.component';

import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExamSubjectCreateComponent } from './exam-subjects/exam-subject-create/exam-subject-create.component';
import { ExamClassCreateComponent } from './exam-class/exam-class-create/exam-class-create.component';
@NgModule({
  declarations: [
    TableContestComponent,
    ExamSubjectsComponent,
    ContestComponent,
    ContestCreateComponent,
    ExamClassComponent,
    ExamSubjectCreateComponent,
    ExamClassCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    DocsComponentsModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule, DataTablesModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    CalendarModule,
    TabViewModule,
    BsDatepickerModule.forRoot(),
    InputTextModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class CoreUIExamModule {
}
