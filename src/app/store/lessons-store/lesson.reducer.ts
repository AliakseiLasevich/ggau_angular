import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import { LessonResponseInterface } from '../../core/models/lesson.interface';
import { LessonsFormInterface } from '../../core/models/lessons-form.interfaces';
import {
  createLessonAction,
  createLessonFailure,
  createLessonSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
  applyFormAction
} from './lesson.actions';
export interface LessonState {
  isLoading: boolean;
  lessons: LessonResponseInterface[];
  error: BackendErrorInterface | null;
  lessonForm: LessonsFormInterface | null;
}

const initialState: LessonState = {
  isLoading: false,
  lessons: [],
  error: null,
  lessonForm: null,
};

export const lessonsReducer = createReducer(
  initialState,
  on(getLessonsAction, (state) => ({ ...state, isLoading: true, error: null })),
  on(getLessonsSuccess, (state, { lessons }) => {
    return {
      ...state,
      lessons: lessons,
      isLoading: false,
    };
  }),
  on(getLessonsFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(applyFormAction, (state, payload) => ({
    ...state,
    isLoading: false,
    lessonForm: payload.lessonForm,
  })),

  on(createLessonAction, (state, payload) => ({
    ...state,
    isLoading: true,
  })),
  on(createLessonSuccess, (state, { lessonResponse }) => ({
    ...state,
    isLoading: false,
    lessons: [...state.lessons, lessonResponse],
  })),
  on(createLessonFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  }))
);
