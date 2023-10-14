import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlannerState} from './planner-store.reducer';

const selectPlannerState = createFeatureSelector<PlannerState>('planner');

export const selectIsPlannerLoading = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.isPlannerLoading
);

export const selectTeachers = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.teachers
);

export const selectTeacherById = (teacherId: string) =>
  createSelector(selectTeachers, (teachers) => {
    return teachers.find((teacher) => teacher.publicId === teacherId) || null;
  });

export const selectDisciplines = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.disciplines
);

export const selectDisciplineById = (disciplineId: string) =>
  createSelector(selectDisciplines, (disciplines) => {
    return (
      disciplines.find((discipline) => discipline.publicId === disciplineId) ||
      null
    );
  });

export const selectFaculties = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.faculties
);

export const selectFacultyById = (facultyId: string) =>
  createSelector(selectFaculties, (faculties) => {
    return faculties.find((faculty) => faculty.publicId === facultyId) || null;
  });

export const selectSpecialties = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.specialties
);

export const selectSpecialtyById = (specialtyId: string) =>
  createSelector(selectSpecialties, (specialties) => {
    return (
      specialties.find((specialty) => specialty.publicId === specialtyId) ||
      null
    );
  });

export const selectSpecialtiesByFacultyId = (facultyId: string) =>
  createSelector(selectSpecialties, (specialties) =>
    specialties.filter((specialty) => specialty.facultyId === facultyId)
  );

export const selectStudentCourses = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.studentCourses
);

export const selectStudentCourseById = (courseId: string) =>
  createSelector(selectStudentCourses, (courses) => {
    return courses.find((course) => course.publicId === courseId) || null;
  });

export const selectStudentCoursesBySpecialty = (specialtyId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses.filter(
      (course) => course.specialtyPublicId === specialtyId
    )
  );

export const selectStudentGroupsByCourse = (courseId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses
      .filter((course) => course.publicId === courseId)
      .flatMap((course) => course.studentGroups)
  );

export const selectStudentGroupById = (groupId: string) =>
  createSelector(
    selectPlannerState,
    (state: PlannerState) =>
      state.studentCourses
        .flatMap((course) => course.studentGroups)
        .find((group) => group.publicId === groupId) || null
  );

export const selectStudentSubgroupByGroupId = (groupId: string) =>
  createSelector(selectPlannerState, (state: PlannerState) =>
    state.studentCourses
      .flatMap((course) => course.studentGroups)
      .filter((group) => group.publicId === groupId)
      .flatMap((group) => group.studentSubgroups)
  );

export const selectStudentSubgroupById = (subgroupId: string) =>
  createSelector(
    selectPlannerState,
    (state: PlannerState) =>
      state.studentCourses
        .flatMap((course) => course.studentGroups)
        .flatMap((group) => group.studentSubgroups)
        .find((subgroup) => subgroup.publicId === subgroupId) || null
  );

export const selectAllBuildings = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.buildings
);

export const selectPlannerError = createSelector(
  selectPlannerState,
  (state: PlannerState) => state.error
);
