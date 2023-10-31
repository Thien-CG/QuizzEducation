import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  SharedModule,
  
} from '@coreui/angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ExamPapersMainRoutingModule } from './exam-papers-main-routing.module';
import { ExamPapersComponent } from './exam-papers/exam-papers.component';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
  declarations: [
    ExamPapersComponent
  ],
  imports: [
    CommonModule,
    ExamPapersMainRoutingModule,
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
    PasswordModule,
    RadioButtonModule,
    CalendarModule,
    ToastModule,
    InputMaskModule,
  ]
})
export class CoreUIExamPaperMainModule {
}
