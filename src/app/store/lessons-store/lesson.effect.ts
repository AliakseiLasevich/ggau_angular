import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { LessonResponseInterface } from '../../core/models/lesson.interface';
import { LessonsFormInterface } from '../../core/models/lessons-form.interfaces';
import { PlannerService } from '../../services/planner-services/planner.service';
import { ActionTypes } from './lesson.actionTypes';
import {
  createLessonFailure,
  createLessonSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
} from './lesson.actions';

// mergeMap - при удалении. Выполняет запросы параллельно, не гарантирует очерёдность выполнения
// concatMap - при создании или апдейте. Добавляет в очередь новые запросы, гарантирует очерёдность выполнения
// exhaustMap - для запросов без параметров. Новые запросы игнорируются, пока текущий внутренний Observable выполняется
// switchMap - для параметризованных запросов. Заменяет не выполненные запросы новыми, старые отменяются

@Injectable()
export class LessonEffects {
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
      ofType(ActionTypes.APPLY_PLANNER_FORM),
      switchMap(({ lessonForm }: { lessonForm: LessonsFormInterface }) => {
        const dateFrom = this.convertDate(lessonForm.fromDate.toString());
        const dateTo = this.convertDate(lessonForm.toDate.toString());
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
