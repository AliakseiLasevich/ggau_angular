import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlannerState } from '../../store/planner.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-lesson-form',
  templateUrl: './new-lesson-form.component.html',
  styleUrls: ['./new-lesson-form.component.scss'],
})
export class NewLessonFormComponent {
  form: FormGroup;

  constructor(
    private store: Store<PlannerState>,
    private formBuilder: FormBuilder
  ) {}

  private initForms() {
    this.form = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
    });
  }
}
