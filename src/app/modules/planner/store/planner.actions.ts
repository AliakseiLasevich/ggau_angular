import { createAction, props } from '@ngrx/store';

import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { ActionTypes } from './planner.actionTypes';

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
