import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, Subject, map } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../../interfaces/studentCourse.interfaces';
import { StudentGroupResponseInterface } from '../../interfaces/studentGroup.interfaces';
import { StudentSubgroupResponseInterface } from '../../interfaces/studentSubgroup.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import {
  getCoursesAction,
  getSpecialtiesAction,
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectSpecialties,
  selectStudentCourseBySpecialty,
  selectStudentCourses,
  selectStudentGroupByCourse,
  selectStudentSubgroupByGroup,
} from '../../store/planner.selectors';
import { LessonTypes } from './../../../../shared/enums/lesson-types.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() teachers$: Observable<TeacherResponseInterface[]>;
  @Input() disciplines$: Observable<DisciplineResponseInterface[]>;
  @Input() faculties$: Observable<FacultyResponseInterface[]>;

  @Input() filter$: Subject<PlannerFilterInterface>;

  specialties$: Observable<SpecialtyResponseInterface[]>;
  studentCourses$: Observable<StudentCourseResponseInterface[]>;
  dynamicForm: FormGroup;

  constructor(
    private store: Store<PlannerState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.initValues();
  }

  private initValues() {
    this.store.dispatch(getSpecialtiesAction());
    this.specialties$ = this.store.select(selectSpecialties);
    this.studentCourses$ = this.store.select(selectStudentCourses);
  }

  private initForms() {
    this.dynamicForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      selectedTeacher: ['', [Validators.required]],
      selectedDiscipline: ['', [Validators.required]],
      selectedLessonType: ['', [Validators.required]],
      dynamicGroups: this.formBuilder.array([this.createDynamicGroup()]),
    });
  }

  createDynamicGroup() {
    const dynamicFormGroup: FormGroup = this.formBuilder.group({
      facultyId: ['', [Validators.required]],
      specialtyId: ['', [Validators.required]],
      studentCourse: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      subgroupIds: ['', [Validators.required]],
    });

    this.declareFieldsErasingStrategy(dynamicFormGroup);

    return dynamicFormGroup;
  }

  getStudentCoursesBySpecialty(
    specialtyId: string
  ): Observable<StudentCourseResponseInterface[]> {
    return this.store.select(selectStudentCourseBySpecialty(specialtyId));
  }

  getStudentGroupByCourse(
    courseId: string
  ): Observable<StudentGroupResponseInterface[]> {
    return this.store.select(selectStudentGroupByCourse(courseId));
  }

  getStudentSubgroupByGroup(
    groupId: string
  ): Observable<StudentSubgroupResponseInterface[]> {
    return this.store.select(selectStudentSubgroupByGroup(groupId));
  }

  updateFormSpecialties(selectedFaculty: MatSelectChange, index: number) {
    const facultyControl = this.dynamicGroups.at(index).get('facultyId');
    if (facultyControl) {
      facultyControl.setValue(selectedFaculty.value);
    }
  }

  updateFormStudentCourses(selectedSpecialty: MatSelectChange, index: number) {
    this.store.dispatch(
      getCoursesAction({ specialtyId: selectedSpecialty.value })
    );
    const specialtyControl = this.dynamicGroups.at(index).get('specialtyId');
    if (specialtyControl) {
      specialtyControl.setValue(selectedSpecialty.value);
    }
  }

  filterSpecialtiesByFaculty(
    facultyId: string
  ): Observable<SpecialtyResponseInterface[]> {
    return this.specialties$.pipe(
      map((specialties) =>
        specialties.filter((specialty) => specialty.facultyId === facultyId)
      )
    );
  }

  // convertDate(selectedDate: string): string {
  //   const jsDate = new Date(selectedDate);
  //   const formattedDate = jsDate.toISOString().split('T')[0];
  //   return formattedDate;
  // }
  convertDate(selectedDate: string): string {
    const localDate = new Date(selectedDate);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
        localDate.getSeconds(),
        localDate.getMilliseconds()
      )
    );
    return utcDate.toISOString().split('T')[0];
  }

  private declareFieldsErasingStrategy(dynamicFormGroup: FormGroup<any>) {
    //Занулять специальность при смене факультета и далее по цепочке
    dynamicFormGroup.get('facultyId')?.valueChanges.subscribe((newValue) => {
      dynamicFormGroup.get('specialtyId')?.setValue(null);
    });

    //Занулять курс при смене специальности
    dynamicFormGroup.get('specialtyId')?.valueChanges.subscribe((newValue) => {
      dynamicFormGroup.get('studentCourse')?.setValue(null);
    });

    //Занулять группу при смене курса
    dynamicFormGroup
      .get('studentCourse')
      ?.valueChanges.subscribe((newValue) => {
        dynamicFormGroup.get('groupId')?.setValue(null);
      });

    //Занулять подгруппы при смене группы
    dynamicFormGroup.get('groupId')?.valueChanges.subscribe((newValue) => {
      dynamicFormGroup.get('subgroupIds')?.setValue([]);
    });
  }

  get dynamicGroups() {
    return this.dynamicForm.get('dynamicGroups') as FormArray;
  }

  addDynamicGroup() {
    this.dynamicGroups.push(this.createDynamicGroup());
  }

  removeDynamicGroup(index: number) {
    if (this.dynamicGroups.length > 1) {
      // Ensure at least one group remains
      this.dynamicGroups.removeAt(index);
    }
  }

  onSubmit() {
    //TODO убрать костыль
    this.dynamicForm
      .get('fromDate')
      ?.setValue(this.convertDate(this.dynamicForm.get('fromDate')?.value));
    this.dynamicForm
      .get('toDate')
      ?.setValue(this.convertDate(this.dynamicForm.get('toDate')?.value));

    this.filter$.next(this.dynamicForm.value);
  }

  lessonTypes = LessonTypes;
}
