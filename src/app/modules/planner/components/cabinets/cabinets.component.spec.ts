import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetsComponent } from './cabinets.component';

describe('CabinetsComponent', () => {
  let component: CabinetsComponent;
  let fixture: ComponentFixture<CabinetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetsComponent]
    });
    fixture = TestBed.createComponent(CabinetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
