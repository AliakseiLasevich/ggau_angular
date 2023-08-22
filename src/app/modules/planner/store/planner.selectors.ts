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