import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { PlannerService } from '../services/planner.service';
import { ActionTypes } from './planner.actionTypes';
import {
  getBuildingsSuccess,
  getCoursesSuccess,
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacutiesSuccess,
  getLessonsFailure,
  getLessonsSuccess,
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
      exhaustMap(() => {
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
      exhaustMap(() => {
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

  getStudentCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_COURSES),
      switchMap(({ specialtyId }) => {
        return this.plannerService.getCoursesBySpecialty(specialtyId).pipe(
          map((response: StudentCourseResponseInterface[]) =>
            getCoursesSuccess({ courses: response })
          ),
          catchError((error) => {
            this.plannerService.handleFailure(error);
            return of(getDisciplinesFailure(error.message));
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
            this.plannerService.handleFailure(error);
            return of(getLessonsFailure(error.message));
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
            this.plannerService.handleFailure(error);
            return of(getLessonsFailure(error.message));
          })
        );
      })
    )
  );
}
