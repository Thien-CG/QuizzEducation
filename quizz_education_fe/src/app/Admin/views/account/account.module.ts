import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule
} from '@coreui/angular';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AccountRoutingModule } from './account-routing.module';
import { TeacherComponent } from './teacher/teacher.component';
import { UserComponent } from './user/user.component';


import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TreeSelectModule } from 'primeng/treeselect';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { TeacherAllotCreateComponent } from './teacher/teacher-allot/teacher-allot-create/teacher-allot-create.component';
import { ChartModule } from 'primeng/chart';

import { TeacherAllotComponent } from './teacher/teacher-allot/teacher-allot.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
@NgModule({
  declarations: [
    TeacherComponent,
    UserComponent,
    CreateUserComponent,
    CreateTeacherComponent,
    TeacherAllotComponent,
    TeacherAllotCreateComponent
  ],
  imports: [
    CommonModule,
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
    AccountRoutingModule,
    PaginatorModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    TabViewModule,
    ToastModule,
    ConfirmDialogModule,
    PasswordModule,
    RadioButtonModule,
    InputMaskModule,
    TreeSelectModule,
    TagModule,
    ChartModule
  ]
})
export class UIAccountModule {
}
