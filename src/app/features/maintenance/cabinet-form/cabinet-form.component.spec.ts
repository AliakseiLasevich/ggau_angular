import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetFormComponent } from './cabinet-form.component';

describe('CabinetFormComponent', () => {
  let component: CabinetFormComponent;
  let fixture: ComponentFixture<CabinetFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetFormComponent]
    });
    fixture = TestBed.createComponent(CabinetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
