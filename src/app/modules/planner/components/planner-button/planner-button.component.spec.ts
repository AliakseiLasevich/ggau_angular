import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerButtonComponent } from './planner-button.component';

describe('PlannerButtonComponent', () => {
  let component: PlannerButtonComponent;
  let fixture: ComponentFixture<PlannerButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerButtonComponent]
    });
    fixture = TestBed.createComponent(PlannerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
