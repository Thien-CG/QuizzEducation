import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';

import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { DataTablesModule } from "angular-datatables";
import { FormsRoutingModule } from './forms-routing.module';
import { TableModule } from 'primeng/table';
import { TestScheduleComponent } from './test-schedule/test-schedule.component';
import { CreateExamQuestionsComponent } from './test-schedule/create-exam-questions/create-exam-questions.component';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  
  declarations: [
    TestScheduleComponent,
    CreateExamQuestionsComponent
    
  ],
  imports: [
    CalendarModule,
    RadioButtonModule,
    FormModule,
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
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    TableModule,
    DataTablesModule,
    InputMaskModule,
    InputTextModule,
    MultiSelectModule,
    TreeSelectModule,
    DropdownModule,
  
    
  ]
})
export class CoreUIFormsModule {
  RouterModule
}
