import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BuildingResponseInterface } from '../../core/models/buildings.interfaces';
import { DisciplineResponseInterface } from '../../core/models/disciplines.interfaces';
import { FacultyResponseInterface } from '../../core/models/faculties.interfaces';
import { SpecialtyResponseInterface } from '../../core/models/specialty.interfaces';
import { StudentCourseResponseInterface } from '../../core/models/studentCourse.interfaces';
import { TeacherResponseInterface } from '../../core/models/teachers.interfaces';
import { ActionTypes } from './planner-store.actionTypes';
import {
  createBuildingFailure,
  createBuildingSuccess,
  getBuildingsFailure,
  getBuildingsSuccess,
  getCoursesFailure,
  getCoursesSuccess,
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacultiesFailure,
  getFacultiesSuccess,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  getTeachersActionFailure,
  getTeachersActionSuccess,
  updateBuildingFailure,
  updateBuildingSuccess,
} from './planner-store.actions';
import {PlannerService} from "../../services/planner-services/planner.service";

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
            getFacultiesSuccess({ faculties: response })
          ),
          catchError((error) => {
            return of(getFacultiesFailure(error));
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
        return this.plannerService.createBuilding(building).pipe(
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
        return this.plannerService.updateBuilding(building).pipe(
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
