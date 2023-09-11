import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LessonTypes } from '../../../../shared/enums/lesson-types.enum';
import { PlannerState } from '../../store/planner.reducer';
import { TeacherResponseInterface } from 'src/app/shared/interfaces/teachers.interfaces';
import { DisciplineResponseInterface } from 'src/app/shared/interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from 'src/app/shared/interfaces/faculties.interfaces';
import { selectIsLoading } from '../../store/planner.selectors';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { setFilterAction } from '../../store/planner.actions';
import { getCoursesAction, getSpecialtiesAction } from 'src/app/shared/shared-store/shared-store.actions';
import { selectSpecialtiesByFaculty, selectStudentCourseBySpecialty, selectStudentGroupByCourse, selectStudentSubgroupByGroup } from 'src/app/shared/shared-store/shared-store.selectors';
import { StudentCourseResponseInterface } from 'src/app/shared/interfaces/studentCourse.interfaces';
import { StudentGroupResponseInterface } from 'src/app/shared/interfaces/studentGroup.interfaces';
import { StudentSubgroupResponseInterface } from 'src/app/shared/interfaces/studentSubgroup.interfaces';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() teachers: TeacherResponseInterface[] | null;
  @Input() disciplines: DisciplineResponseInterface[] | null;
  @Input() faculties: FacultyResponseInterface[] | null;
  @Output() isFormValid = new EventEmitter<boolean>();
  isLoading$: Observable<boolean>;
  dynamicForm: FormGroup;
  lessonTypes = LessonTypes;

  constructor(
    private store: Store<PlannerState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchData();
    this.initializeListeners();
  }

  initializeListeners() {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.dynamicForm.valueChanges.subscribe((formValues) => {
      if (this.dynamicForm.valid) {
        const filterValue = this.dynamicForm.value as PlannerFilterInterface;
        this.store.dispatch(setFilterAction({ filter: filterValue }));
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
    return this.store.select(selectSpecialtiesByFaculty(facultyId));
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
}
