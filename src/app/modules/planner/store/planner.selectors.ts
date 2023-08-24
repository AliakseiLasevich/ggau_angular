import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlannerState } from './planner.reducer';

const selectPlannerState = createFeatureSelector<PlannerState>('planner');

export const selectIsLoading = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.isLoading
);

export const selectTeachers = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.teachers
);

export const selectDisciplines = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.disciplines
);

export const selectFaculties = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.faculties
);

export const selectSpecialties = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.specialties
);

export const selectStudentCourses = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.studentCourses
);

export const selectStudentCourseBySpecialty = (specialtyId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses.filter(
      (course) => course.specialtyPublicId === specialtyId
    )
  );

export const selectStudentGroupByCourse = (courseId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses
      .filter((course) => course.publicId === courseId)
      .flatMap((course) => course.studentGroups)
  );

export const selectStudentSubgroupByGroup = (groupId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses
      .flatMap((course) => course.studentGroups)
      .filter((group) => group.publicId === groupId)
      .flatMap((group) => group.studentSubgroups)
  );
