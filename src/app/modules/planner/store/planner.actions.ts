import { createAction, props } from '@ngrx/store';

import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  LessonRequestInterface,
  LessonResponseInterface,
} from '../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../interfaces/planner-filter.interfaces';
import { ActionTypes } from './planner.actionTypes';

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

// FILTER STATE
export const setFilterAction = createAction(
  ActionTypes.SET_FILTER,
  props<{ filter: PlannerFilterInterface }>()
);

//LESSONS CREATE
export const createLessonAction = createAction(
  ActionTypes.CREATE_LESSON,
  props<{ lessonRequest: LessonRequestInterface }>()
);

export const createLessonSuccess = createAction(
  ActionTypes.CREATE_LESSON_SUCCESS,
  props<{ lessonResponse: LessonResponseInterface }>()
);

export const createLessonFailure = createAction(
  ActionTypes.CREATE_LESSON_FAILURE,
  props<{ error: BackendErrorInterface }>()
);
