import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { LessonRequestInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../../interfaces/studentCourse.interfaces';
import { StudentGroupResponseInterface } from '../../interfaces/studentGroup.interfaces';
import { StudentSubgroupResponseInterface } from '../../interfaces/studentSubgroup.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { createLessonAction } from '../../store/planner.actions';
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
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewLessonFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      orderNumber: number;
      orderTime: string;
      cabinetId: string;
      date: string;
    }
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

  onSubmit() {
    //TODO избавиться от костыля
    const parts = this.data.date.split('.');
    const day = +parts[0];
    const month = +parts[1] - 1; // Months are zero-based (0-11)
    const year = +parts[2];
    const dateObject = new Date(year, month, day);

    let lesson: LessonRequestInterface = {
      cabinetId: this.data.cabinetId,
      date: this.datePipe.transform(dateObject, 'yyyy-MM-dd')!,
      lessonType: this.selectedFilter!.selectedLessonType,
      disciplineId: this.selectedFilter!.selectedDiscipline,
      orderNumber: this.data.orderNumber,
      teacherId: this.selectedFilter!.selectedTeacher,
      studentSubgroupIds: this.selectedFilter!.dynamicGroups.flatMap(
        (groups) => groups.subgroupIds
      ),
      note: this.form.value?.note
    };

    //TODO add note
    this.store.dispatch(createLessonAction({ lessonRequest: lesson }));
  }
}
