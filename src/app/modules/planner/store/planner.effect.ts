import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { PlannerService } from '../services/planner.service';
import { ActionTypes } from './planner.actionTypes';
import {
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacutiesSuccess,
  getSpecialtiesSuccess,
  getTeachersActionFailure,
  getTeachersActionSuccess,
} from './planner.actions';

@Injectable()
export class PlannerEffects {
  constructor(
    private actions$: Actions,
    private plannerService: PlannerService
  ) {}

  getTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_TEACHERS),
      switchMap(() => {
        return this.plannerService.getTeachers().pipe(
          map((response: TeacherResponseInterface[]) =>
            getTeachersActionSuccess({ teachers: response })
          ),
          catchError((error) => {
            this.plannerService.handleFailure(error);
            return of(getTeachersActionFailure(error.message));
          })
        );
      })
    )
  );

  getDisciplines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_DISCIPLINES),
      switchMap(() => {
        return this.plannerService.getDisciplines().pipe(
          map((response: DisciplineResponseInterface[]) =>
            getDisciplinesSuccess({ disciplines: response })
          ),
          catchError((error) => {
            this.plannerService.handleFailure(error);
            return of(getDisciplinesFailure(error.message));
          })
        );
      })
    )
  );

  getFaculties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_FACULTIES),
      switchMap(() => {
        return this.plannerService.getFaculties().pipe(
          map((response: FacultyResponseInterface[]) =>
            getFacutiesSuccess({ faculties: response })
          ),
          catchError((error) => {
            this.plannerService.handleFailure(error);
            return of(getDisciplinesFailure(error.message));
          })
        );
      })
    )
  );

  getSpecialties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_SPECIALTIES),
      switchMap(({ publicId }) => {
        return this.plannerService.getSpecialtiesByFaculty(publicId).pipe(
          map((response: SpecialtyResponseInterface[]) =>
            getSpecialtiesSuccess({ specialties: response })
          ),
          catchError((error) => {
            this.plannerService.handleFailure(error);
            return of(getDisciplinesFailure(error.message));
          })
        );
      })
    )
  );
}
