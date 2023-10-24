import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAllotCreateComponent } from './teacher-allot-create.component';

describe('TeacherAllotCreateComponent', () => {
  let component: TeacherAllotCreateComponent;
  let fixture: ComponentFixture<TeacherAllotCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAllotCreateComponent]
    });
    fixture = TestBed.createComponent(TeacherAllotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
