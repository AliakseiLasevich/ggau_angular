import { createAction, props } from '@ngrx/store';

import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
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
export const getSpecialtiesAction = createAction(
  ActionTypes.GET_SPECIALTIES,
  props<{ publicId: string }>()
);

export const getSpecialtiesSuccess = createAction(
  ActionTypes.GET_SPECIALTIES_SUCCESS,
  props<{ specialties: SpecialtyResponseInterface[] }>()
);

export const getSpecialtiesFailure = createAction(
  ActionTypes.GET_SPECIALTIESS_FAILURE,
  props<{ payload: string }>()
);
