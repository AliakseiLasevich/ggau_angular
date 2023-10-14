import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisciplineResponseInterface } from 'src/app/core/models/disciplines.interfaces';
import { FacultyResponseInterface } from 'src/app/core/models/faculties.interfaces';
import { StudentCourseResponseInterface } from 'src/app/core/models/studentCourse.interfaces';
import { StudentGroupResponseInterface } from 'src/app/core/models/studentGroup.interfaces';
import { StudentSubgroupResponseInterface } from 'src/app/core/models/studentSubgroup.interfaces';
import { TeacherResponseInterface } from 'src/app/core/models/teachers.interfaces';
import {
  getCoursesAction,
  getSpecialtiesAction,
} from 'src/app/store/planner-store/planner-store.actions';
import {
  selectSpecialtiesByFacultyId,
  selectStudentCoursesBySpecialty,
  selectStudentGroupsByCourse,
  selectStudentSubgroupByGroupId,
} from 'src/app/store/planner-store/planner-store.selectors';
import { LessonTypes } from '../../../core/enums/lesson-types.enum';
import { LessonsFormInterface } from '../../../core/models/lessons-form.interfaces';
import { applyFormAction } from '../../../store/lessons-store/lesson.actions';
import { LessonState } from '../../../store/lessons-store/lesson.reducer';

@Component({
  selector: 'app-planner-form',
  templateUrl: './planner-form.component.html',
  styleUrls: ['./planner-form.component.scss'],
})
export class PlannerFormComponent implements OnInit {
  @Input() teachers: TeacherResponseInterface[] | null;
  @Input() disciplines: DisciplineResponseInterface[] | null;
  @Input() faculties: FacultyResponseInterface[] | null;
  @Output() isFormValid = new EventEmitter<boolean>();

  dynamicForm: FormGroup;
  lessonTypes = LessonTypes;

  constructor(
    private store: Store<LessonState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchData();
    this.initializeListeners();
  }

  initializeListeners() {
    this.dynamicForm.valueChanges.subscribe((formValues) => {
      if (this.dynamicForm.valid) {
        const formValue = this.dynamicForm.value as LessonsFormInterface;
        this.store.dispatch(applyFormAction({ lessonForm: formValue }));
      }
      this.isFormValid.emit(this.dynamicForm.valid);
    });
  }

  private fetchData() {
    this.store.dispatch(getSpecialtiesAction());
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

  getSpecialtiesByFaculty(facultyId: string) {
    return this.store.select(selectSpecialtiesByFacultyId(facultyId));
  }

  getStudentCoursesBySpecialty(
    specialtyId: string
  ): Observable<StudentCourseResponseInterface[]> {
    return this.store.select(selectStudentCoursesBySpecialty(specialtyId));
  }

  getStudentGroupByCourse(
    courseId: string
  ): Observable<StudentGroupResponseInterface[]> {
    return this.store.select(selectStudentGroupsByCourse(courseId));
  }

  getStudentSubgroupByGroup(
    groupId: string
  ): Observable<StudentSubgroupResponseInterface[]> {
    return this.store.select(selectStudentSubgroupByGroupId(groupId));
  }
}
