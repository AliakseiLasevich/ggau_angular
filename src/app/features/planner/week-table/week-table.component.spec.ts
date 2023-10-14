import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTableComponent } from './week-table.component';

describe('WeekComponent', () => {
  let component: WeekTableComponent;
  let fixture: ComponentFixture<WeekTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekTableComponent],
    });
    fixture = TestBed.createComponent(WeekTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
