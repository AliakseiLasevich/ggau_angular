import {createAction, props} from '@ngrx/store';

import {BackendErrorInterface} from 'src/app/core/models/backendErrors.interface';
import {BuildingRequestInterface, BuildingResponseInterface,} from '../../core/models/buildings.interfaces';
import {DisciplineResponseInterface} from '../../core/models/disciplines.interfaces';
import {FacultyResponseInterface} from '../../core/models/faculties.interfaces';
import {SpecialtyResponseInterface} from '../../core/models/specialty.interfaces';
import {StudentCourseResponseInterface} from '../../core/models/studentCourse.interfaces';
import {TeacherResponseInterface} from '../../core/models/teachers.interfaces';
import {ActionTypes} from './planner-store.actionTypes';

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

export const getFacultiesSuccess = createAction(
  ActionTypes.GET_FACULTIES_SUCCESS,
  props<{ faculties: FacultyResponseInterface[] }>()
);

export const getFacultiesFailure = createAction(
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

export const createBuildingAction = createAction(
  ActionTypes.CREATE_BUILDING,
  props<{ building: BuildingRequestInterface }>()
);

export const createBuildingSuccess = createAction(
  ActionTypes.CREATE_BUILDING_SUCCESS,
  props<{ response: BuildingResponseInterface }>()
);

export const createBuildingFailure = createAction(
  ActionTypes.CREATE_BUILDING_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

export const updateBuildingAction = createAction(
  ActionTypes.UPDATE_BUILDING,
  props<{ building: BuildingRequestInterface }>()
);

export const updateBuildingSuccess = createAction(
  ActionTypes.UPDATE_BUILDING_SUCCESS,
  props<{ response: BuildingResponseInterface }>()
);

export const updateBuildingFailure = createAction(
  ActionTypes.UPDATE_BUILDING_FAILURE,
  props<{ error: BackendErrorInterface }>()
);

export const deleteBuildingAction = createAction(
  ActionTypes.DELETE_BUILDING,
  props<{ buildingId: string }>()
);

export const deleteBuildingSuccess = createAction(
  ActionTypes.DELETE_BUILDING_SUCCESS,
  props<{ buildingId: string }>()
);

export const deleteBuildingFailure = createAction(
  ActionTypes.DELETE_BUILDING_FAILURE,
  props<{ error: BackendErrorInterface }>()
);
