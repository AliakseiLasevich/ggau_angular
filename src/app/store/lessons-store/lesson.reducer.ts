import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import { LessonResponseInterface } from '../../core/models/lesson.interface';
import { LessonsFilterInterface } from '../../core/models/lessons-filter.interfaces';
import {
  createLessonAction,
  createLessonFailure,
  createLessonSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
  setFilterAction
} from './lesson.actions';
export interface LessonState {
  isLoading: boolean;
  lessons: LessonResponseInterface[];
  error: BackendErrorInterface | null;
  filter: LessonsFilterInterface | null;
}

const initialState: LessonState = {
  isLoading: false,
  lessons: [],
  error: null,
  filter: null,
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

  on(setFilterAction, (state, payload) => ({
    ...state,
    isLoading: false,
    filter: payload.filter,
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
