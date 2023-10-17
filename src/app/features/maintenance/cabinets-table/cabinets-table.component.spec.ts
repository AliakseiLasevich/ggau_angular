import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetsTableComponent } from './cabinets-table.component';

describe('CabinetsTableComponent', () => {
  let component: CabinetsTableComponent;
  let fixture: ComponentFixture<CabinetsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetsTableComponent]
    });
    fixture = TestBed.createComponent(CabinetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
