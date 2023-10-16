import {DatePipe} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {LessonRequestInterface} from '../../../core/models/lesson.interface';
import {LessonsFormInterface} from '../../../core/models/lessons-form.interfaces';

import {createLessonAction} from '../../../store/lessons-store/lesson.actions';
import {LessonState} from '../../../store/lessons-store/lesson.reducer';
import {

  selectLessonForm,
} from '../../../store/lessons-store/lesson.selectors';
import {DisciplineResponseInterface} from 'src/app/core/models/disciplines.interfaces';
import {TeacherResponseInterface} from 'src/app/core/models/teachers.interfaces';
import {FacultyResponseInterface} from 'src/app/core/models/faculties.interfaces';
import {
  selectDisciplineById,
  selectFacultyById,
  selectSpecialtyById,
  selectStudentCourseById,
  selectStudentGroupById,
  selectStudentSubgroupById,
  selectTeacherById
} from 'src/app/store/planner-store/planner-store.selectors';
import {SpecialtyResponseInterface} from 'src/app/core/models/specialty.interfaces';
import {StudentCourseResponseInterface} from 'src/app/core/models/studentCourse.interfaces';
import {StudentGroupResponseInterface} from 'src/app/core/models/studentGroup.interfaces';
import {StudentSubgroupResponseInterface} from 'src/app/core/models/studentSubgroup.interfaces';
import {LessonStoreFacade} from "../../../store/lessons-store/lesson-store.facade";

@Component({
  selector: 'app-new-lesson-form',
  templateUrl: './new-lesson-form.component.html',
  styleUrls: ['./new-lesson-form.component.scss'],
})
export class NewLessonFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedFilter: LessonsFormInterface | null;

  filter$: Observable<LessonsFormInterface | null>;
  discipline$: Observable<DisciplineResponseInterface | null>;
  teacher$: Observable<TeacherResponseInterface | null>;
  faculty$: Observable<FacultyResponseInterface | null>;

  private filterSubscription: Subscription | undefined;
  private disciplineSubscription: Subscription | undefined;

  constructor(
    private store: Store<LessonState>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<NewLessonFormComponent>,
    private lessonStateFacade: LessonStoreFacade,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      orderNumber: number;
      orderTime: string;
      cabinetId: string;
      date: string;
    }
  ) {
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  ngOnInit(): void {
    this.initForms();
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues() {
    this.filter$ = this.store.select(selectLessonForm);
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

    this.lessonStateFacade.createLessonAction(lesson);
  }
}
