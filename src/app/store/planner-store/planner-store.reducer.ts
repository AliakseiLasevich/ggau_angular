import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import { BuildingResponseInterface } from '../../core/models/buildings.interfaces';
import { DisciplineResponseInterface } from '../../core/models/disciplines.interfaces';
import { FacultyResponseInterface } from '../../core/models/faculties.interfaces';
import { SpecialtyResponseInterface } from '../../core/models/specialty.interfaces';
import { StudentCourseResponseInterface } from '../../core/models/studentCourse.interfaces';
import { TeacherResponseInterface } from '../../core/models/teachers.interfaces';
import {
  createBuildingAction,
  createBuildingFailure,
  createBuildingSuccess,
  getBuildingsAction,
  getBuildingsFailure,
  getBuildingsSuccess,
  getCoursesAction,
  getCoursesFailure,
  getCoursesSuccess,
  getDisciplinesAction,
  getDisciplinesFailure,
  getDisciplinesSuccess,
  getFacultiesAction,
  getFacultiesFailure,
  getFacultiesSuccess,
  getSpecialtiesAction,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  getTeachersAction,
  getTeachersActionFailure,
  getTeachersActionSuccess,
  updateBuildingAction,
  updateBuildingFailure,
  updateBuildingSuccess,
} from './planner-store.actions';
export interface PlannerState {
  isPlannerLoading: boolean;
  teachers: TeacherResponseInterface[];
  disciplines: DisciplineResponseInterface[];
  faculties: FacultyResponseInterface[];
  specialties: SpecialtyResponseInterface[];
  studentCourses: StudentCourseResponseInterface[];
  buildings: BuildingResponseInterface[];
  error: BackendErrorInterface | null;
}

const initialState: PlannerState = {
  isPlannerLoading: false,
  teachers: [],
  disciplines: [],
  faculties: [],
  specialties: [],
  studentCourses: [],
  buildings: [],
  error: null,
};

export const plannerReducer = createReducer(
  initialState,

  on(getTeachersAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getTeachersActionSuccess, (state, payload) => {
    return {
      ...state,
      teachers: payload.teachers,
      isLoading: false,
    };
  }),
  on(getTeachersActionFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(getDisciplinesAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getDisciplinesSuccess, (state, payload) => {
    return {
      ...state,
      disciplines: payload.disciplines,
      isLoading: false,
    };
  }),
  on(getDisciplinesFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(getFacultiesAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getFacultiesSuccess, (state, payload) => {
    return {
      ...state,
      faculties: payload.faculties,
      isLoading: false,
    };
  }),
  on(getFacultiesFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(getSpecialtiesAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getSpecialtiesSuccess, (state, { specialties }) => {
    const existingSpecialties = new Set(
      state.specialties.map((specialty) => specialty.publicId)
    );
    const newSpecialties = specialties.filter(
      (specialty) => !existingSpecialties.has(specialty.publicId)
    );
    return {
      ...state,
      specialties: [...state.specialties, ...newSpecialties],
      isLoading: false,
    };
  }),
  on(getSpecialtiesFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(getCoursesAction, (state) => ({ ...state, isLoading: true, error: null })),
  on(getCoursesSuccess, (state, { courses }) => {
    const existingCourseIds = new Set(
      state.studentCourses.map((course) => course.publicId)
    );
    const newCourses = courses.filter(
      (course) => !existingCourseIds.has(course.publicId)
    );
    return {
      ...state,
      studentCourses: [...state.studentCourses, ...newCourses],
      isLoading: false,
    };
  }),
  on(getCoursesFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(getBuildingsAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(getBuildingsSuccess, (state, { buildings }) => {
    return {
      ...state,
      buildings: buildings,
      isLoading: false,
    };
  }),
  on(getBuildingsFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(createBuildingAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(createBuildingSuccess, (state, { response }) => {
    return {
      ...state,
      buildings: [...state.buildings, response],
      isLoading: false,
    };
  }),
  on(createBuildingFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  })),

  on(updateBuildingAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateBuildingSuccess, (state, { response }) => {
    const updatedBuildings = state.buildings.map((building) => {
      if (building.publicId === response.publicId) {
        return response; // Replace with the new response
      }
      return building;
    });

    return {
      ...state,
      buildings: updatedBuildings,
      isLoading: false,
    };
  }),
  on(updateBuildingFailure, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error,
  }))
);
