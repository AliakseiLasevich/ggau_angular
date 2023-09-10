import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../interfaces/planner-filter.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { PlannerService } from '../services/planner.service';
import { ActionTypes } from './planner.actionTypes';
import {
  createLessonFailure,
  createLessonSuccess,
  getBuildingsFailure,
  getBuildingsSuccess,
  getCoursesFailure,
  getCoursesSuccess,
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacutiesFailure,
  getFacutiesSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  getTeachersActionFailure,
  getTeachersActionSuccess,
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

  getTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_TEACHERS),
      exhaustMap(() => {
        return this.plannerService.getTeachers().pipe(
          map((response: TeacherResponseInterface[]) =>
            getTeachersActionSuccess({ teachers: response })
          ),
          catchError((error) => {
            return of(getTeachersActionFailure(error));
          })
        );
      })
    )
  );

  getDisciplines$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_DISCIPLINES),
      exhaustMap(() => {
        return this.plannerService.getDisciplines().pipe(
          map((response: DisciplineResponseInterface[]) =>
            getDisciplinesSuccess({ disciplines: response })
          ),
          catchError((error) => {
            return of(getDisciplinesFailure(error));
          })
        );
      })
    )
  );

  getFaculties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_FACULTIES),
      exhaustMap(() => {
        return this.plannerService.getFaculties().pipe(
          map((response: FacultyResponseInterface[]) =>
            getFacutiesSuccess({ faculties: response })
          ),
          catchError((error) => {
            return of(getFacutiesFailure(error));
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
            return of(getSpecialtiesFailure(error));
          })
        );
      })
    )
  );

  getStudentCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_COURSES),
      switchMap(({ specialtyId }) => {
        return this.plannerService.getCoursesBySpecialty(specialtyId).pipe(
          map((response: StudentCourseResponseInterface[]) =>
            getCoursesSuccess({ courses: response })
          ),
          catchError((error) => {
            return of(getCoursesFailure(error));
          })
        );
      })
    )
  );

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

  getBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_BUILDINGS),
      exhaustMap(() => {
        return this.plannerService.getBuildings().pipe(
          map((response: BuildingResponseInterface[]) =>
            getBuildingsSuccess({ buildings: response })
          ),
          catchError((error) => {
            return of(getBuildingsFailure(error));
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
}
