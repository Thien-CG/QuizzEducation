import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { DynamicDialogModule } from 'primeng/dynamicdialog';
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

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TableContestComponent } from './contest/table-contest/table-contest.component';
import { ExamClassComponent } from './exam-class/exam-class.component';
import { FormsRoutingModule } from './exam-routing.module';
import { TooltipModule } from 'primeng/tooltip';
import { ContestComponent } from './contest/contest.component';
import { ContestCreateComponent } from './contest/table-contest/contest-create/contest-create.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContestDetailComponent } from './contest/table-contest/contest-detail/contest-detail.component';
import { ExamClassCreateComponent } from './exam-class/exam-class-create/exam-class-create.component';
@NgModule({
  declarations: [
    TableContestComponent,
    ContestComponent,
    ContestCreateComponent,
    ExamClassComponent,
    ExamClassCreateComponent,
    ContestDetailComponent,
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
    ConfirmDialogModule,
    DynamicDialogModule,
    MultiSelectModule,
    TooltipModule
  ]
})
export class CoreUIExamModule {
}
