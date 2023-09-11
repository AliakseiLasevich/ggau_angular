import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import {
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
  getFacutiesFailure,
  getFacutiesSuccess,
  getSpecialtiesAction,
  getSpecialtiesFailure,
  getSpecialtiesSuccess,
  getTeachersAction,
  getTeachersActionFailure,
  getTeachersActionSuccess,
} from './shared-store.actions';
export interface SharedState {
  isLoading: boolean;
  teachers: TeacherResponseInterface[];
  disciplines: DisciplineResponseInterface[];
  faculties: FacultyResponseInterface[];
  specialties: SpecialtyResponseInterface[];
  studentCourses: StudentCourseResponseInterface[];
  buildings: BuildingResponseInterface[];
  error: BackendErrorInterface | null;
}

const initialState: SharedState = {
  isLoading: false,
  teachers: [],
  disciplines: [],
  faculties: [],
  specialties: [],
  studentCourses: [],
  buildings: [],
  error: null,
};

export const sharedReducer = createReducer(
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
  on(getFacutiesSuccess, (state, payload) => {
    return {
      ...state,
      faculties: payload.faculties,
      isLoading: false,
    };
  }),
  on(getFacutiesFailure, (state, payload) => ({
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
  }))
);
