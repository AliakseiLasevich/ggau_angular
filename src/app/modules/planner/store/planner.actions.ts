import { createAction, props } from '@ngrx/store';

import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { ActionTypes } from './planner.actionTypes';
import { LessonResponseInterface } from '../interfaces/lesson.interface';

// TEACHERS
export const getTeachersAction = createAction(ActionTypes.GET_TEACHERS);

export const getTeachersActionSuccess = createAction(
  ActionTypes.GET_TEACHERS_SUCCESS,
  props<{ teachers: TeacherResponseInterface[] }>()
);

export const getTeachersActionFailure = createAction(
  ActionTypes.GET_TEACHERS_FAILURE,
  props<{ payload: string }>()
);

// DISCIPLINES
export const getDisciplinesAction = createAction(ActionTypes.GET_DISCIPLINES);

export const getDisciplinesSuccess = createAction(
  ActionTypes.GET_DISCIPLINES_SUCCESS,
  props<{ disciplines: DisciplineResponseInterface[] }>()
);

export const getDisciplinesFailure = createAction(
  ActionTypes.GET_DISCIPLINES_FAILURE,
  props<{ payload: string }>()
);

// FACULTIES
export const getFacultiesAction = createAction(ActionTypes.GET_FACULTIES);

export const getFacutiesSuccess = createAction(
  ActionTypes.GET_FACULTIES_SUCCESS,
  props<{ faculties: FacultyResponseInterface[] }>()
);

export const getFacutiesFailure = createAction(
  ActionTypes.GET_FACULTIES_FAILURE,
  props<{ payload: string }>()
);

// SPECIALTIES
export const getSpecialtiesAction = createAction(ActionTypes.GET_SPECIALTIES);

export const getSpecialtiesSuccess = createAction(
  ActionTypes.GET_SPECIALTIES_SUCCESS,
  props<{ specialties: SpecialtyResponseInterface[] }>()
);

export const getSpecialtiesFailure = createAction(
  ActionTypes.GET_SPECIALTIESS_FAILURE,
  props<{ payload: string }>()
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
  props<{ payload: string }>()
);

export const getLessonsAction = createAction(
  ActionTypes.GET_LESSONS,
  props<{ dateFrom: Date, dateTo: Date }>()
);

export const getLessonsSuccess = createAction(
  ActionTypes.GET_LESSONS_SUCCESS,
  props<{ lessons: LessonResponseInterface[]}>()
);

export const getLessonsFailure = createAction(
  ActionTypes.GET_LESSONS_FAILURE,
  props<{ payload: string }>()
);