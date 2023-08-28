import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import {
  getBuildingsAction,
  getDisciplinesAction,
  getFacultiesAction,
  getTeachersAction
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectAllBuildings,
  selectDisciplines,
  selectFaculties,
  selectTeachers,
} from '../../store/planner.selectors';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';

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

  filter: PlannerFilterInterface;

  constructor(private store: Store<PlannerState>) {}

  ngOnInit(): void {
    this.teachers$ = this.store.select(selectTeachers);
    this.disciplines$ = this.store.select(selectDisciplines);
    this.faculties$ = this.store.select(selectFaculties);
    this.buildings$ = this.store.select(selectAllBuildings);

    this.store.dispatch(getTeachersAction());
    this.store.dispatch(getDisciplinesAction());
    this.store.dispatch(getFacultiesAction());
    this.store.dispatch(getBuildingsAction());
  }

  filterSubmittedEvent(filter: PlannerFilterInterface) {
    this.filter = filter;
  }
}
