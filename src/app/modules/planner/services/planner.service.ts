import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LessonRequestInterface,
  LessonResponseInterface,
} from '../interfaces/lesson.interface';
import { TeacherResponseInterface } from 'src/app/shared/interfaces/teachers.interfaces';
import { DisciplineResponseInterface } from 'src/app/shared/interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from 'src/app/shared/interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from 'src/app/shared/interfaces/specialty.interfaces';
import { StudentCourseResponseInterface } from 'src/app/shared/interfaces/studentCourse.interfaces';
import { BuildingResponseInterface } from 'src/app/shared/interfaces/buildings.interfaces';


@Injectable()
export class PlannerService {
  //TODO move to environment
  url = 'http://localhost:8080/rest/';

  constructor(private http: HttpClient) {}

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

  getLessonsByDateRange(
    from: Date,
    to: Date
  ): Observable<LessonResponseInterface[]> {
    return this.http.get<LessonResponseInterface[]>(this.url + 'lessons', {
      params: { dateFrom: from?.toString(), dateTo: to?.toString() },
    });
  }

  getBuildings(): Observable<BuildingResponseInterface[]> {
    return this.http.get<BuildingResponseInterface[]>(this.url + 'buildings');
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
