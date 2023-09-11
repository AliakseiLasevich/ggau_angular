import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';

import { PlannerState } from '../../store/planner.reducer';
import {
  selectFilter,
  selectLessons,
  selectPlannerError,
} from '../../store/planner.selectors';
import { TeacherResponseInterface } from 'src/app/shared/interfaces/teachers.interfaces';
import { DisciplineResponseInterface } from 'src/app/shared/interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from 'src/app/shared/interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from 'src/app/shared/interfaces/specialty.interfaces';
import { BuildingResponseInterface } from 'src/app/shared/interfaces/buildings.interfaces';
import { getBuildingsAction, getDisciplinesAction, getFacultiesAction, getTeachersAction } from 'src/app/shared/shared-store/shared-store.actions';
import { selectAllBuildings, selectDisciplines, selectFaculties, selectTeachers } from 'src/app/shared/shared-store/shared-store.selectors';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  isFormValid: boolean;
  teachers$: Observable<TeacherResponseInterface[]>;
  disciplines$: Observable<DisciplineResponseInterface[]>;
  faculties$: Observable<FacultyResponseInterface[]>;
  specialties$: Observable<SpecialtyResponseInterface[]>;
  buildings$: Observable<BuildingResponseInterface[]>;
  lessons$: Observable<LessonResponseInterface[]>;
  filter$: Observable<PlannerFilterInterface | null>;

  constructor(
    private store: Store<PlannerState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
    this.initializeListeners();

    this.store.pipe(select(selectPlannerError)).subscribe((error) => {
      if (error) {
        this._snackBar.open(error.message, 'OK', { duration: 5 * 1000 });
      }
    });
  }
  initializeListeners() {}
  private fetchData() {
    this.store.dispatch(getTeachersAction());
    this.store.dispatch(getDisciplinesAction());
    this.store.dispatch(getFacultiesAction());
    this.store.dispatch(getBuildingsAction());
  }

  private initializeValues() {
    this.teachers$ = this.store.select(selectTeachers);
    this.disciplines$ = this.store.select(selectDisciplines);
    this.faculties$ = this.store.select(selectFaculties);
    this.buildings$ = this.store.select(selectAllBuildings);
    this.filter$ = this.store.select(selectFilter);
    this.lessons$ = this.store.select(selectLessons);
  }

  handleFormValidity(isFormValid: boolean) {
    this.isFormValid = isFormValid;
  }
}
