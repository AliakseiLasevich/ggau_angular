import { createReducer, on } from '@ngrx/store';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import {
  getDisciplinesAction,
  getDisciplinesSuccess,
  getTeachersAction,
  getTeachersActionSuccess,
} from './planner.actions';

export interface PlannerState {
  isLoading: boolean;
  teachers: TeacherResponseInterface[];
  disciplines: DisciplineResponseInterface[];
}

const initialState: PlannerState = {
  isLoading: false,
  teachers: [],
  disciplines: [],
};

export const plannerReducer = createReducer(
  initialState,
  on(getTeachersAction, (state) => ({ ...state, isLoading: true })),
  on(getTeachersActionSuccess, (state, payload) => {
    return {
      ...state,
      teachers: payload.teachers,
      isLoading: false,
    };
  }),
  on(getDisciplinesAction, (state) => ({ ...state, isLoading: true })),
  on(getDisciplinesSuccess, (state, payload) => {
    return {
      ...state,
      disciplines: payload.disciplines,
      isLoading: false,
    };
  })
);
