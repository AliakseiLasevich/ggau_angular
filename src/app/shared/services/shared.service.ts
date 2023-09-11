import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingResponseInterface } from '../interfaces/buildings.interfaces';
import { StudentCourseResponseInterface } from '../interfaces/studentCourse.interfaces';
import { SpecialtyResponseInterface } from '../interfaces/specialty.interfaces';
import { FacultyResponseInterface } from '../interfaces/faculties.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';

@Injectable()
export class SharedService {
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

  getBuildings(): Observable<BuildingResponseInterface[]> {
    return this.http.get<BuildingResponseInterface[]>(this.url + 'buildings');
  }
}
