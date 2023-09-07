import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { PlannerState } from '../../store/planner.reducer';
import { selectFilter, selectTeacherById } from '../../store/planner.selectors';

@Component({
  selector: 'app-new-lesson-form',
  templateUrl: './new-lesson-form.component.html',
  styleUrls: ['./new-lesson-form.component.scss'],
})
export class NewLessonFormComponent implements OnInit {
  form: FormGroup;
  filter$: Observable<PlannerFilterInterface | null>;
  filter: PlannerFilterInterface | null;
  selectedTeacher$: TeacherResponseInterface;
  selectedTeacher: TeacherResponseInterface | null;

  constructor(
    private store: Store<PlannerState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewLessonFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { orderNumber: string; orderTime: string }
  ) {}

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit(): void {
    this.initForms();
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues() {
    this.filter$ = this.store.select(selectFilter);
  }

  initForms() {
    this.form = this.formBuilder.group({
      note: ['', [Validators.required]],
    });
  }

  initializeListeners() {
    this.filter$.subscribe((filter) => {
      this.filter = filter;
      if (filter && filter.selectedTeacher) {
        this.store
          .select(selectTeacherById(filter.selectedTeacher))
          .subscribe((teacher) => {
            this.selectedTeacher = teacher;
          });
      } else {
        this.selectedTeacher = null;
      }
    });
  }
}
