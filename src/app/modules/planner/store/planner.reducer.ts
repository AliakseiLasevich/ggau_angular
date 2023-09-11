import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../interfaces/planner-filter.interfaces';
import {
  createLessonAction,
  createLessonFailure,
  createLessonSuccess,
  getLessonsAction,
  getLessonsFailure,
  getLessonsSuccess,
  setFilterAction
} from './planner.actions';
export interface PlannerState {
  isLoading: boolean;
  lessons: LessonResponseInterface[];
  error: BackendErrorInterface | null;
  filter: PlannerFilterInterface | null;
}

const initialState: PlannerState = {
  isLoading: false,
  lessons: [],
  error: null,
  filter: null,
};

export const plannerReducer = createReducer(
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
