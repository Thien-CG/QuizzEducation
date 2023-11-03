import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamQuestionsComponent } from './create-exam-questions.component';

describe('CreateExamQuestionsComponent', () => {
  let component: CreateExamQuestionsComponent;
  let fixture: ComponentFixture<CreateExamQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExamQuestionsComponent]
    });
    fixture = TestBed.createComponent(CreateExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
