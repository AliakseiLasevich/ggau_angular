import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import {
  getDisciplinesAction,
  getTeachersAction,
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import {
  selectDisciplines,
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

  constructor(private store: Store<PlannerState>) {}

  ngOnInit(): void {
    this.teachers$ = this.store.select(selectTeachers);
    this.disciplines$ = this.store.select(selectDisciplines);
    this.store.dispatch(getTeachersAction());
    this.store.dispatch(getDisciplinesAction());
  }
}