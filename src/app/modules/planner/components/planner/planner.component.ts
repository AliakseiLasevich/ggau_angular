import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import {
  getBuildingsAction,
  getDisciplinesAction,
  getFacultiesAction,
  getLessonsAction,
  getTeachersAction,
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectDisciplines,
  selectFaculties,
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

  filter$: Subject<PlannerFilterInterface> = new Subject();
  dateFrom: Date;
  dateTo: Date;

  constructor(private store: Store<PlannerState>) {}

  ngOnInit(): void {
    this.teachers$ = this.store.select(selectTeachers);
    this.disciplines$ = this.store.select(selectDisciplines);
    this.faculties$ = this.store.select(selectFaculties);

    this.store.dispatch(getTeachersAction());
    this.store.dispatch(getDisciplinesAction());
    this.store.dispatch(getFacultiesAction());

    this.filter$.subscribe((filter) => {
      filter &&
        this.store.dispatch(
          getLessonsAction({
            dateFrom: filter?.fromDate,
            dateTo: filter.toDate,
          })
        );
      this.store.dispatch(getBuildingsAction());
      this.dateFrom = filter.fromDate;
      this.dateTo = filter.toDate;
    });
  }
}
