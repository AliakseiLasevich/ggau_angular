import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {PlannerState} from "./planner-store.reducer";
import {
  createBuildingAction,
  getBuildingsAction,
  getCoursesAction,
  getDisciplinesAction,
  getFacultiesAction,
  getSpecialtiesAction,
  getTeachersAction,
  updateBuildingAction
} from "./planner-store.actions";
import {
  selectAllBuildings,
  selectDisciplineById,
  selectDisciplines,
  selectFaculties,
  selectFacultyById,
  selectIsPlannerLoading,
  selectPlannerError,
  selectSpecialties,
  selectSpecialtiesByFacultyId,
  selectSpecialtyById,
  selectStudentCourseById,
  selectStudentCourses,
  selectStudentCoursesBySpecialty,
  selectStudentGroupById,
  selectStudentGroupsByCourse,
  selectStudentSubgroupByGroupId,
  selectStudentSubgroupById,
  selectTeacherById,
  selectTeachers
} from "./planner-store.selectors";
import {Observable} from "rxjs";
import {BuildingRequestInterface, BuildingResponseInterface} from "../../core/models/buildings.interfaces";
import {TeacherResponseInterface} from "../../core/models/teachers.interfaces";
import {DisciplineResponseInterface} from "../../core/models/disciplines.interfaces";
import {FacultyResponseInterface} from "../../core/models/faculties.interfaces";
import {SpecialtyResponseInterface} from "../../core/models/specialty.interfaces";
import {StudentCourseResponseInterface} from "../../core/models/studentCourse.interfaces";
import {BackendErrorInterface} from "../../core/models/backendErrors.interface";
import {StudentGroupResponseInterface} from "../../core/models/studentGroup.interfaces";
import {StudentSubgroupResponseInterface} from "../../core/models/studentSubgroup.interfaces";

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  isPlannerLoading$: Observable<boolean> = this.store.pipe(select(selectIsPlannerLoading));
  allBuildings$: Observable<BuildingResponseInterface[]> = this.store.pipe(select(selectAllBuildings));
  teachers$: Observable<TeacherResponseInterface[]> = this.store.pipe(select(selectTeachers));
  disciplines$: Observable<DisciplineResponseInterface[]> = this.store.pipe(select(selectDisciplines));
  faculties$: Observable<FacultyResponseInterface[]> = this.store.pipe(select(selectFaculties));
  specialties$: Observable<SpecialtyResponseInterface[]> = this.store.pipe(select(selectSpecialties));
  studentCourses$: Observable<StudentCourseResponseInterface[]> = this.store.pipe(select(selectStudentCourses));
  buildings$: Observable<BuildingResponseInterface[]> = this.store.pipe(select(selectAllBuildings));
  error$: Observable<BackendErrorInterface | null> = this.store.pipe(select(selectPlannerError));

  constructor(private store: Store<PlannerState>) {
  }

  getTeacherById(id: string): Observable<TeacherResponseInterface | null> {
    return this.store.pipe(select(selectTeacherById(id)));
  }

  getDisciplineById(id: string): Observable<DisciplineResponseInterface | null> {
    return this.store.pipe(select(selectDisciplineById(id)));
  }

  getFacultyById(id: string): Observable<FacultyResponseInterface | null> {
    return this.store.pipe(select(selectFacultyById(id)));
  }

  getSpecialtyById(id: string): Observable<SpecialtyResponseInterface | null> {
    return this.store.pipe(select(selectSpecialtyById(id)));
  }

  getSpecialtiesByFacultyId(id: string): Observable<SpecialtyResponseInterface[] | null> {
    return this.store.pipe(select(selectSpecialtiesByFacultyId(id)));
  }


  getStudentCourseById(id: string): Observable<StudentCourseResponseInterface | null> {
    return this.store.pipe(select(selectStudentCourseById(id)));
  }

  getStudentCourseBySpecialtyId(specialtyId: string): Observable<StudentCourseResponseInterface[] | null> {
    return this.store.pipe(select(selectStudentCoursesBySpecialty(specialtyId)));
  }

  getStudentGroupByCourse(courseId: string): Observable<StudentGroupResponseInterface[] | null> {
    return this.store.pipe(select(selectStudentGroupsByCourse(courseId)));
  }

  getStudentGroupById(groupId: string): Observable<StudentGroupResponseInterface | null> {
    return this.store.pipe(select(selectStudentGroupById(groupId)));
  }

  getStudentSubgroupByGroupId(groupId: string): Observable<StudentSubgroupResponseInterface[] | null> {
    return this.store.pipe(select(selectStudentSubgroupByGroupId(groupId)));
  }

  getStudentSubgroupById(subgroupId: string): Observable<StudentSubgroupResponseInterface | null> {
    return this.store.pipe(select(selectStudentSubgroupById(subgroupId)));
  }


  // Dispatch functions
  fetchTeachers() {
    this.store.dispatch(getTeachersAction());
  }

  fetchDisciplines() {
    this.store.dispatch(getDisciplinesAction());
  }

  fetchFaculties() {
    this.store.dispatch(getFacultiesAction());
  }

  fetchSpecialties() {
    this.store.dispatch(getSpecialtiesAction());
  }

  fetchCoursesBySpecialty(specialtyId: string) {
    this.store.dispatch(getCoursesAction({specialtyId}));
  }

  fetchBuildings() {
    this.store.dispatch(getBuildingsAction());
  }

  createBuilding(building: BuildingRequestInterface) {
    this.store.dispatch(createBuildingAction({building}));
  }

  updateBuilding(building: BuildingRequestInterface) {
    this.store.dispatch(updateBuildingAction({building}));
  }


}

