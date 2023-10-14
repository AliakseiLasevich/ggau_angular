import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BuildingRequestInterface, BuildingResponseInterface,} from '../../core/models/buildings.interfaces';
import {DisciplineResponseInterface} from '../../core/models/disciplines.interfaces';
import {FacultyResponseInterface} from '../../core/models/faculties.interfaces';
import {SpecialtyResponseInterface} from '../../core/models/specialty.interfaces';
import {StudentCourseResponseInterface} from '../../core/models/studentCourse.interfaces';
import {TeacherResponseInterface} from '../../core/models/teachers.interfaces';
import {LessonRequestInterface, LessonResponseInterface} from "../../core/models/lesson.interface";

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  //TODO move to environment
  url = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {
  }

  getTeachers(): Observable<TeacherResponseInterface[]> {
    return this.http.get<TeacherResponseInterface[]>(this.url + 'teachers');
  }

  getDisciplines(): Observable<DisciplineResponseInterface[]> {
    return this.http.get<DisciplineResponseInterface[]>(
      this.url + 'disciplines'
    );
  }

  getFaculties(): Observable<FacultyResponseInterface[]> {
    return this.http.get<FacultyResponseInterface[]>(this.url + 'faculties');
  }

  getSpecialtiesByFaculty(
    facultyId: string
  ): Observable<SpecialtyResponseInterface[]> {
    return this.http.get<SpecialtyResponseInterface[]>(
      this.url + 'specialties'
    );
  }

  getCoursesBySpecialty(
    specialtyId: string
  ): Observable<StudentCourseResponseInterface[]> {
    return this.http.get<StudentCourseResponseInterface[]>(
      this.url + 'student_courses/specialties/' + specialtyId
    );
  }

  getBuildings(): Observable<BuildingResponseInterface[]> {
    return this.http.get<BuildingResponseInterface[]>(this.url + 'buildings');
  }

  createBuilding(
    data: BuildingRequestInterface
  ): Observable<BuildingResponseInterface> {
    return this.http.post<BuildingResponseInterface>(
      this.url + 'buildings',
      data
    );
  }

  updateBuilding(
    data: BuildingRequestInterface
  ): Observable<BuildingResponseInterface> {
    return this.http.put<BuildingResponseInterface>(
      this.url + 'buildings/' + data.publicId,
      data
    );
  }

  getLessonsByDateRange(
    from: Date,
    to: Date
  ): Observable<LessonResponseInterface[]> {
    return this.http.get<LessonResponseInterface[]>(this.url + 'lessons', {
      params: {dateFrom: from?.toString(), dateTo: to?.toString()},
    });
  }

  createLesson(
    request: LessonRequestInterface
  ): Observable<LessonResponseInterface> {
    return this.http.post<LessonResponseInterface>(
      this.url + 'lessons',
      request
    );
  }
}
