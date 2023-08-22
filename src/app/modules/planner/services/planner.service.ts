import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherResponseInterface } from '../interfaces/teachers.interfaces';
import { DisciplineResponseInterface } from '../interfaces/disciplines.interfaces';

@Injectable()
export class PlannerService {
  url = 'http://localhost:8080/rest/';
  constructor(private http: HttpClient) {}

  getTeachers(): Observable<TeacherResponseInterface[]> {
    //TODO move to environment
    // const url = environment.apiUrl + '/authenticate';
    return this.http.get<TeacherResponseInterface[]>(this.url + 'teachers');
  }

  getDisciplines(): Observable<DisciplineResponseInterface[]> {
    return this.http.get<DisciplineResponseInterface[]>(this.url + 'disciplines');
  }

  handleFailure(error: string) {
    console.log(error);
  }
}
