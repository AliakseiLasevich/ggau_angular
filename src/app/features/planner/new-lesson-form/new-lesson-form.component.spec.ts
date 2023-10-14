import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLessonFormComponent } from './new-lesson-form.component';

describe('NewLessonFormComponent', () => {
  let component: NewLessonFormComponent;
  let fixture: ComponentFixture<NewLessonFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLessonFormComponent]
    });
    fixture = TestBed.createComponent(NewLessonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
