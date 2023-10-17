import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {Observable} from 'rxjs';
import {DisciplineResponseInterface} from 'src/app/core/models/disciplines.interfaces';
import {FacultyResponseInterface} from 'src/app/core/models/faculties.interfaces';
import {StudentCourseResponseInterface} from 'src/app/core/models/studentCourse.interfaces';
import {StudentGroupResponseInterface} from 'src/app/core/models/studentGroup.interfaces';
import {StudentSubgroupResponseInterface} from 'src/app/core/models/studentSubgroup.interfaces';
import {TeacherResponseInterface} from 'src/app/core/models/teachers.interfaces';
import {LessonTypes} from '../../../core/enums/lesson-types.enum';
import {LessonsFormInterface} from '../../../core/models/lessons-form.interfaces';
import {LessonStoreFacade} from "../../../store/lessons-store/lesson-store.facade";
import {PlannerStoreFacade} from "../../../store/planner-store/planner-store.facade";

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
    private lessonStateFacade: LessonStoreFacade,
    private plannerStateFacade: PlannerStoreFacade,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForms();
    this.fetchData();
    this.initializeListeners();
  }

  initializeListeners() {
    this.dynamicForm.valueChanges.subscribe((formValues) => {
      if (this.dynamicForm.valid) {
        const formValue = this.dynamicForm.value as LessonsFormInterface;
        this.lessonStateFacade.applyLessonForm(formValue);
      }
        this.isFormValid.emit(this.dynamicForm.valid);
    });
  }

  private fetchData() {
    this.plannerStateFacade.fetchSpecialties();
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
    this.plannerStateFacade.fetchCoursesBySpecialty(selectedSpecialty.value);
    const specialtyControl = this.dynamicGroups.at(index).get('specialtyId');
    if (specialtyControl) {
      specialtyControl.setValue(selectedSpecialty.value);
    }
  }

  private declareFieldsErasingStrategy(dynamicFormGroup: FormGroup<any>) {
    //Занулять специальность при смене факультета и далее по цепочке
    dynamicFormGroup.get('facultyId')?.valueChanges.subscribe(() => {
      dynamicFormGroup.get('specialtyId')?.setValue(null);
    });

    //Занулять курс при смене специальности
    dynamicFormGroup.get('specialtyId')?.valueChanges.subscribe(() => {
      dynamicFormGroup.get('studentCourse')?.setValue(null);
    });

    //Занулять группу при смене курса
    dynamicFormGroup
      .get('studentCourse')
      ?.valueChanges.subscribe(() => {
      dynamicFormGroup.get('groupId')?.setValue(null);
    });

    //Занулять подгруппы при смене группы
    dynamicFormGroup.get('groupId')?.valueChanges.subscribe(() => {
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
    return this.plannerStateFacade.getSpecialtiesByFacultyId(facultyId);
  }

  getStudentCoursesBySpecialty(
    specialtyId: string
  ): Observable<StudentCourseResponseInterface[] | null> {
    return this.plannerStateFacade.getStudentCourseBySpecialtyId(specialtyId)
  }

  getStudentGroupByCourse(
    courseId: string
  ): Observable<StudentGroupResponseInterface[] | null> {
    return this.plannerStateFacade.getStudentGroupByCourse(courseId);
  }

  getStudentSubgroupByGroup(
    groupId: string
  ): Observable<StudentSubgroupResponseInterface[] | null> {
    return this.plannerStateFacade.getStudentSubgroupByGroupId(groupId)
  }
}
