import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { SharedService } from '../services/shared.service';
import { ActionTypes } from './shared-store.actionTypes';
import {
  createBuildingFailure,
  createBuildingSuccess,
  getBuildingsFailure,
  getBuildingsSuccess,
  getCoursesFailure,
  getCoursesSuccess,
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacutiesFailure,
  getFacutiesSuccess,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  getTeachersActionFailure,
  getTeachersActionSuccess,
  updateBuildingFailure,
  updateBuildingSuccess,
} from './shared-store.actions';

// mergeMap - при удалении
// concatMap - при создании или апдейте
// exhaustMap - для запросов без параметров
// switchMap - для параметризованных запросов

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private sharedService: SharedService
  ) {}

  getTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_TEACHERS),
      exhaustMap(() => {
        return this.sharedService.getTeachers().pipe(
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
        return this.sharedService.getDisciplines().pipe(
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
        return this.sharedService.getFaculties().pipe(
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
        return this.sharedService.getSpecialtiesByFaculty(publicId).pipe(
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
        return this.sharedService.getCoursesBySpecialty(specialtyId).pipe(
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

  getBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.GET_BUILDINGS),
      exhaustMap(() => {
        return this.sharedService.getBuildings().pipe(
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

  createBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.CREATE_BUILDING),
      switchMap(({ building }) => {
        return this.sharedService.createBuilding(building).pipe(
          map((response: BuildingResponseInterface) =>
            createBuildingSuccess({
              response,
            })
          ),
          catchError((error) => {
            return of(createBuildingFailure(error));
          })
        );
      })
    )
  );

  updateBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.UPDATE_BUILDING),
      switchMap(({ building }) => {
        return this.sharedService.updateBuilding(building).pipe(
          map((response: BuildingResponseInterface) =>
            updateBuildingSuccess({
              response,
            })
          ),
          catchError((error) => {
            return of(updateBuildingFailure(error));
          })
        );
      })
    )
  );
}
