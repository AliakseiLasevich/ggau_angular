import { createAction, props } from '@ngrx/store';

import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import {
  LessonRequestInterface,
  LessonResponseInterface,
} from '../../core/models/lesson.interface';
import { LessonsFormInterface } from '../../core/models/lessons-form.interfaces';
import { ActionTypes } from './lesson.actionTypes';

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
export const applyFormAction = createAction(
  ActionTypes.APPLY_PLANNER_FORM,
  props<{ lessonForm: LessonsFormInterface }>()
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
