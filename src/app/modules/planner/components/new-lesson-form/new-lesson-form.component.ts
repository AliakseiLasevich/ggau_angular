import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../../interfaces/studentCourse.interfaces';
import { StudentGroupResponseInterface } from '../../interfaces/studentGroup.interfaces';
import { StudentSubgroupResponseInterface } from '../../interfaces/studentSubgroup.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectDisciplineById,
  selectFacultyById,
  selectFilter,
  selectSpecialtyById,
  selectStudentCourseById,
  selectStudentGroupById,
  selectStudentSubgroupById,
  selectTeacherById,
} from '../../store/planner.selectors';

@Component({
  selector: 'app-new-lesson-form',
  templateUrl: './new-lesson-form.component.html',
  styleUrls: ['./new-lesson-form.component.scss'],
})
export class NewLessonFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedFilter: PlannerFilterInterface | null;

  filter$: Observable<PlannerFilterInterface | null>;
  discipline$: Observable<DisciplineResponseInterface | null>;
  teacher$: Observable<TeacherResponseInterface | null>;
  faculty$: Observable<FacultyResponseInterface | null>;

  private filterSubscription: Subscription | undefined;
  private disciplineSubscription: Subscription | undefined;

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
    this.filterSubscription = this.filter$.subscribe((filter) => {
      if (filter) {
        this.selectedFilter = filter;

        this.discipline$ = this.store.select(
          selectDisciplineById(filter.selectedDiscipline)
        );

        this.teacher$ = this.store.select(
          selectTeacherById(filter.selectedTeacher)
        );
      }
    });
  }

  getFacultyById(
    facultyId: string
  ): Observable<FacultyResponseInterface | null> {
    return this.store.select(selectFacultyById(facultyId));
  }

  getSpecialtyById(
    specialtyId: string
  ): Observable<SpecialtyResponseInterface | null> {
    return this.store.select(selectSpecialtyById(specialtyId));
  }

  getStudentCourseById(
    courseId: string
  ): Observable<StudentCourseResponseInterface | null> {
    return this.store.select(selectStudentCourseById(courseId));
  }

  getStudentGroupById(
    groupId: string
  ): Observable<StudentGroupResponseInterface | null> {
    return this.store.select(selectStudentGroupById(groupId));
  }

  getSubgroupById(
    subgroupId: string
  ): Observable<StudentSubgroupResponseInterface | null> {
    return this.store.select(selectStudentSubgroupById(subgroupId));
  }

  ngOnDestroy() {
    this.filterSubscription?.unsubscribe();
    this.disciplineSubscription?.unsubscribe();
  }
}
