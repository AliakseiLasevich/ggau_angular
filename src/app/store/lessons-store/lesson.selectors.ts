import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './lesson.reducer';

const selectPlannerState = createFeatureSelector<LessonState>('planner');

export const selectIsLoading = createSelector(
  selectPlannerState,
  (state: LessonState) => state.isLoading
);

export const selectLessons = createSelector(
  selectPlannerState,
  (state: LessonState) => state.lessons
);

export const selectLessonsByCabinetAndDateAndOrder = (
  cabinetId: string,
  date: string,
  order: number
) =>
  createSelector(selectPlannerState, (state: LessonState) =>
    state.lessons
      .filter((lesson) => lesson.cabinet.publicId === cabinetId)
      .filter((lesson) => areDatesEqual(lesson.date, date))
      .filter((lesson) => lesson.orderNumber === order)
  );

//TODO remove hack
function areDatesEqual(date1: number[], date2: string): boolean {
  const [year1, month1, day1] = date1;
  const [day2, month2, year2] = date2.split('.').map(Number);

  const jsDate1 = new Date(year1, month1 - 1, day1);
  const jsDate2 = new Date(year2, month2 - 1, day2);

  return jsDate1.getTime() === jsDate2.getTime();
}

export const selectPlannerError = createSelector(
  selectPlannerState,
  (state: LessonState) => state.error
);

export const selectFilter = createSelector(
  selectPlannerState,
  (state: LessonState) => state.filter
);
