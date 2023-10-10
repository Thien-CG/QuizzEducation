import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestDetailComponent } from './contest-detail.component';

describe('ContestDetailComponent', () => {
  let component: ContestDetailComponent;
  let fixture: ComponentFixture<ContestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestDetailComponent]
    });
    fixture = TestBed.createComponent(ContestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
