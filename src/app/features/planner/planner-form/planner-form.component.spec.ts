import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerFormComponent } from './planner-form.component';

describe('FilterComponent', () => {
  let component: PlannerFormComponent;
  let fixture: ComponentFixture<PlannerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerFormComponent],
    });
    fixture = TestBed.createComponent(PlannerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
