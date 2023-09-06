import { createAction, props } from '@ngrx/store';

import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { ActionTypes } from './planner.actionTypes';
import { PlannerFilterInterface } from '../interfaces/planner-filter.interfaces';

// TEACHERS
export const getTeachersAction = createAction(ActionTypes.GET_TEACHERS);

export const getTeachersActionSuccess = createAction(
  ActionTypes.GET_TEACHERS_SUCCESS,
  props<{ teachers: TeacherResponseInterface[] }>()
);

export const getTeachersActionFailure = createAction(
  ActionTypes.GET_TEACHERS_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// DISCIPLINES
export const getDisciplinesAction = createAction(ActionTypes.GET_DISCIPLINES);

export const getDisciplinesSuccess = createAction(
  ActionTypes.GET_DISCIPLINES_SUCCESS,
  props<{ disciplines: DisciplineResponseInterface[] }>()
);

export const getDisciplinesFailure = createAction(
  ActionTypes.GET_DISCIPLINES_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// FACULTIES
export const getFacultiesAction = createAction(ActionTypes.GET_FACULTIES);

export const getFacutiesSuccess = createAction(
  ActionTypes.GET_FACULTIES_SUCCESS,
  props<{ faculties: FacultyResponseInterface[] }>()
);

export const getFacutiesFailure = createAction(
  ActionTypes.GET_FACULTIES_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// SPECIALTIES
export const getSpecialtiesAction = createAction(ActionTypes.GET_SPECIALTIES);

export const getSpecialtiesSuccess = createAction(
  ActionTypes.GET_SPECIALTIES_SUCCESS,
  props<{ specialties: SpecialtyResponseInterface[] }>()
);

export const getSpecialtiesFailure = createAction(
  ActionTypes.GET_SPECIALTIESS_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// COURSES
export const getCoursesAction = createAction(
  ActionTypes.GET_COURSES,
  props<{ specialtyId: string }>()
);

export const getCoursesSuccess = createAction(
  ActionTypes.GET_COURSES_SUCCESS,
  props<{ courses: StudentCourseResponseInterface[] }>()
);

export const getCoursesFailure = createAction(
  ActionTypes.GET_COURSES_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

//LESSONS
export const getLessonsAction = createAction(
  ActionTypes.GET_LESSONS,
  props<{ dateFrom: string; dateTo: string }>()
);

export const getLessonsSuccess = createAction(
  ActionTypes.GET_LESSONS_SUCCESS,
  props<{ lessons: LessonResponseInterface[] }>()
);

export const getLessonsFailure = createAction(
  ActionTypes.GET_LESSONS_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// BUILDINGS
export const getBuildingsAction = createAction(ActionTypes.GET_BUILDINGS);

export const getBuildingsSuccess = createAction(
  ActionTypes.GET_BUILDINGS_SUCCESS,
  props<{ buildings: BuildingResponseInterface[] }>()
);

export const getBuildingsFailure = createAction(
  ActionTypes.GET_BUILDINGS_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

// FILTER STATE
export const setFilterAction = createAction(
  ActionTypes.SET_FILTER,
  props<{ filter: PlannerFilterInterface }>()
);
