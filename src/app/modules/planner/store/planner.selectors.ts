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

export const selectSpecialtiesByFaculty = (facultyId: string) =>
  createSelector(selectSpecialties, (specialties) =>
    specialties.filter((specialty) => specialty.facultyId === facultyId)
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

export const selectStudentCountBySubgroups = (groupIds: string[]) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses
      .flatMap((course) => course.studentGroups)
      .flatMap((group) => group.studentSubgroups)
      .filter((subgroup) => groupIds.includes(subgroup.publicId))
      .map((subgroup) => subgroup.studentsCount)
      .reduce((sum, current) => sum + current, 0)
  );

export const selectAllBuildings = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.buildings
);

export const selectLessons = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.lessons
);

export const selectLessonsByCabinetAndDateAndOrder = (
  cabinetId: string,
  date: string,
  order: number
) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
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
  (state: PlannerState) => state.error
);

export const selectFilter = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.filter
);