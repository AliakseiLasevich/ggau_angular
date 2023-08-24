import { createReducer, on } from '@ngrx/store';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import {
  getCoursesAction,
  getCoursesSuccess,
  getDisciplinesAction,
  getDisciplinesSuccess,
  getFacultiesAction,
  getFacutiesSuccess,
  getSpecialtiesAction,
  getSpecialtiesSuccess,
  getTeachersAction,
  getTeachersActionSuccess,
} from './planner.actions';

export interface PlannerState {
  isLoading: boolean;
  teachers: TeacherResponseInterface[];
  disciplines: DisciplineResponseInterface[];
  faculties: FacultyResponseInterface[];
  specialties: SpecialtyResponseInterface[];
  studentCourses: StudentCourseResponseInterface[];
}

const initialState: PlannerState = {
  isLoading: false,
  teachers: [],
  disciplines: [],
  faculties: [],
  specialties: [],
  studentCourses: [],
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
  }),
  on(getFacultiesAction, (state) => ({ ...state, isLoading: true })),
  on(getFacutiesSuccess, (state, payload) => {
    return {
      ...state,
      faculties: payload.faculties,
      specialties: [],
      isLoading: false,
    };
  }),
  on(getSpecialtiesAction, (state) => ({ ...state, isLoading: true })),
  on(getSpecialtiesSuccess, (state, payload) => {
    return {
      ...state,
      specialties: payload.specialties,
      isLoading: false,
    };
  }),

  on(getCoursesAction, (state) => ({ ...state, isLoading: true })),
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
  })
);
