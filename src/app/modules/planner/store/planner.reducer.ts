import { createReducer, on } from '@ngrx/store';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { LessonResponseInterface } from '../interfaces/lesson.interface';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import {
  getBuildingsAction,
  getBuildingsSuccess,
  getCoursesAction,
  getCoursesSuccess,
  getDisciplinesAction,
  getDisciplinesSuccess,
  getFacultiesAction,
  getFacutiesSuccess,
  getLessonsAction,
  getLessonsSuccess,
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
  buildings: BuildingResponseInterface[];
  lessons: LessonResponseInterface[];
  dateFrom: Date | null;
  dateTo: Date | null;
}

const initialState: PlannerState = {
  isLoading: false,
  teachers: [],
  disciplines: [],
  faculties: [],
  specialties: [],
  studentCourses: [],
  buildings: [],
  lessons: [],
  dateFrom: null,
  dateTo: null,
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
      isLoading: false,
    };
  }),

  on(getSpecialtiesAction, (state) => ({ ...state, isLoading: true })),
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
  }),

  on(getLessonsAction, (state) => ({ ...state, isLoading: true })),
  on(getLessonsSuccess, (state, { lessons }) => {
    return {
      ...state,
      lessons: lessons,
      isLoading: false,
    };
  }),

  on(getBuildingsAction, (state) => ({ ...state, isLoading: true })),
  on(getBuildingsSuccess, (state, { buildings }) => {
    return {
      ...state,
      buildings: buildings,
      isLoading: false,
    };
  })
);
