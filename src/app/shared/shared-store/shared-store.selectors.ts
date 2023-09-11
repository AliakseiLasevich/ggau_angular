import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared-store.reducer';

const selectSharedState = createFeatureSelector<SharedState>('shared');

export const selectIsLoading = createSelector(
  selectSharedState,
  (state: SharedState) => state.isLoading
);

export const selectTeachers = createSelector(
  selectSharedState,
  (state: SharedState) => state.teachers
);

export const selectTeacherById = (teacherId: string) =>
  createSelector(selectTeachers, (teachers) => {
    return teachers.find((teacher) => teacher.publicId === teacherId) || null;
  });

export const selectDisciplines = createSelector(
  selectSharedState,
  (state: SharedState) => state.disciplines
);

export const selectDisciplineById = (disciplineId: string) =>
  createSelector(selectDisciplines, (disciplines) => {
    return (
      disciplines.find((discipline) => discipline.publicId === disciplineId) ||
      null
    );
  });

export const selectFaculties = createSelector(
  selectSharedState,
  (state: SharedState) => state.faculties
);

export const selectFacultyById = (facultyId: string) =>
  createSelector(selectFaculties, (faculties) => {
    return faculties.find((faculty) => faculty.publicId === facultyId) || null;
  });

export const selectSpecialties = createSelector(
  selectSharedState,
  (state: SharedState) => state.specialties
);

export const selectSpecialtyById = (specialtyId: string) =>
  createSelector(selectSpecialties, (specialties) => {
    return (
      specialties.find((specialty) => specialty.publicId === specialtyId) ||
      null
    );
  });

export const selectSpecialtiesByFaculty = (facultyId: string) =>
  createSelector(selectSpecialties, (specialties) =>
    specialties.filter((specialty) => specialty.facultyId === facultyId)
  );

export const selectStudentCourses = createSelector(
  selectSharedState,
  (state: SharedState) => state.studentCourses
);

export const selectStudentCourseById = (courseId: string) =>
  createSelector(selectStudentCourses, (courses) => {
    return courses.find((course) => course.publicId === courseId) || null;
  });

export const selectStudentCourseBySpecialty = (specialtyId: string) =>
  createSelector(selectSharedState, (state: SharedState) =>
    state.studentCourses.filter(
      (course) => course.specialtyPublicId === specialtyId
    )
  );

export const selectStudentGroupByCourse = (courseId: string) =>
  createSelector(selectSharedState, (state: SharedState) =>
    state.studentCourses
      .filter((course) => course.publicId === courseId)
      .flatMap((course) => course.studentGroups)
  );

export const selectStudentGroupById = (groupId: string) =>
  createSelector(
    selectSharedState,
    (state: SharedState) =>
      state.studentCourses
        .flatMap((course) => course.studentGroups)
        .find((group) => group.publicId === groupId) || null
  );

export const selectStudentSubgroupByGroup = (groupId: string) =>
  createSelector(selectSharedState, (state: SharedState) =>
    state.studentCourses
      .flatMap((course) => course.studentGroups)
      .filter((group) => group.publicId === groupId)
      .flatMap((group) => group.studentSubgroups)
  );

export const selectStudentSubgroupById = (subgroupId: string) =>
  createSelector(
    selectSharedState,
    (state: SharedState) =>
      state.studentCourses
        .flatMap((course) => course.studentGroups)
        .flatMap((group) => group.studentSubgroups)
        .find((subgroup) => subgroup.publicId === subgroupId) || null
  );

export const selectAllBuildings = createSelector(
  selectSharedState,
  (state: SharedState) => state.buildings
);

export const selectPlannerError = createSelector(
  selectSharedState,
  (state: SharedState) => state.error
);
