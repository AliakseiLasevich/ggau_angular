import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsTableComponent } from './buildings-table.component';

describe('BuildingsComponent', () => {
  let component: BuildingsTableComponent;
  let fixture: ComponentFixture<BuildingsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingsTableComponent],
    });
    fixture = TestBed.createComponent(BuildingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
