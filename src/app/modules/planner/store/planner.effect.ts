import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../interfaces/planner-filter.interfaces';
import { PlannerService } from '../services/planner.service';
import { ActionTypes } from './planner.actionTypes';
import {
  createLessonFailure,
  createLessonSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
} from './planner.actions';

// mergeMap - при удалении
// concatMap - при создании или апдейте
// exhaustMap - для запросов без параметров
// switchMap - для параметризованных запросов

@Injectable()
export class PlannerEffects {
  constructor(
    private actions$: Actions,
    private plannerService: PlannerService
  ) {}

  getLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_LESSONS),
      switchMap(({ dateFrom, dateTo }) => {
        return this.plannerService.getLessonsByDateRange(dateFrom, dateTo).pipe(
          map((response: LessonResponseInterface[]) =>
            getLessonsSuccess({ lessons: response })
          ),
          catchError((error) => {
            return of(getLessonsFailure(error));
          })
        );
      })
    )
  );

  triggerGetLessons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.SET_FILTER),
      switchMap(({ filter }: { filter: PlannerFilterInterface }) => {
        const dateFrom = this.convertDate(filter.fromDate.toString());
        const dateTo = this.convertDate(filter.toDate.toString());
        return of(getLessonsAction({ dateFrom, dateTo }));
      })
    )
  );

  createLesson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.CREATE_LESSON),
      switchMap(({ lessonRequest }) => {
        return this.plannerService.createLesson(lessonRequest).pipe(
          map((response) => createLessonSuccess({ lessonResponse: response })),
          catchError((error) => {
            return of(createLessonFailure(error));
          })
        );
      })
    )
  );

  convertDate(selectedDate: string): string {
    const localDate = new Date(selectedDate);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
        localDate.getSeconds(),
        localDate.getMilliseconds()
      )
    );
    return utcDate.toISOString().split('T')[0];
  }
}
