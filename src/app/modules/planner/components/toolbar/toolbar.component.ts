import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { getSpecialtiesAction } from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import { selectSpecialties } from '../../store/planner.selectors';
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

  specialties$: Observable<SpecialtyResponseInterface[]>;
  dynamicForm: FormGroup;

  constructor(
    private store: Store<PlannerState>,
    private formBuilder: FormBuilder
  ) {
    this.initForms();
  }

  private initForms() {
    this.dynamicForm = this.formBuilder.group({
      selectedDate: ['', [Validators.required]],
      selectedTeacher: ['', [Validators.required]],
      selectedDiscipline: ['', [Validators.required]],
      selectedLessonType: ['', [Validators.required]],
      dynamicGroups: this.formBuilder.array([this.createDynamicGroup()]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getSpecialtiesAction());
    this.specialties$ = this.store.select(selectSpecialties);
  }

  updateFormSpecialties(selectedFaculty: MatSelectChange, index: number) {
    console.log(selectedFaculty, index);
    const facultyControl = this.dynamicGroups.at(index).get('facultyId');
    if (facultyControl) {
      facultyControl.setValue(selectedFaculty.value);
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

  convertDate(selectedDate: string): string {
    const jsDate = new Date(selectedDate);
    const formattedDate = jsDate.toISOString().split('T')[0];
    return formattedDate;
  }

  createDynamicGroup() {
    return this.formBuilder.group({
      facultyId: ['', [Validators.required]],
      specialtyId: ['', [Validators.required]],
      courseNumber: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      subgroupIds: ['', [Validators.required]],
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
    console.log(this.dynamicForm.value);
  }

  lessonTypes = LessonTypes;

  courses: string[] = ['1', '2', '3', '4', '5'];

  groups: { groupNumber: number; subgroups: string[] }[] = [
    { groupNumber: 1, subgroups: ['a', 'b'] },
    { groupNumber: 2, subgroups: ['a', 'b', 'c'] },
  ];

  subgroups = new FormControl('');
  subgroupsList: string[] = ['А', 'Б', 'В'];

  pairOrders: string[] = ['1', '2', '3', '4', '5'];
}
