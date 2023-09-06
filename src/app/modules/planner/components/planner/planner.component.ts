import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import {
  getBuildingsAction,
  getDisciplinesAction,
  getFacultiesAction,
  getTeachersAction,
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectAllBuildings,
  selectDisciplines,
  selectFaculties,
  selectFilter,
  selectLessons,
  selectPlannerError,
  selectTeachers,
} from '../../store/planner.selectors';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
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

    this.store.pipe(select(selectPlannerError)).subscribe((error) => {
      if (error) {
        this._snackBar.open(error.message, 'OK', { duration: 3 * 1000 });
      }
    });
  }

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
}
