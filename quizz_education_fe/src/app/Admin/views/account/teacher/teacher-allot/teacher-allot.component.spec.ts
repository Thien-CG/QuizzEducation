import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAllotComponent } from './teacher-allot.component';

describe('TeacherAllotComponent', () => {
  let component: TeacherAllotComponent;
  let fixture: ComponentFixture<TeacherAllotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAllotComponent]
    });
    fixture = TestBed.createComponent(TeacherAllotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
