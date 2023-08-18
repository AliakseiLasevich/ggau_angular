import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthRequestInterface,
  AuthResponseInterface,
} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(data: AuthRequestInterface): Observable<AuthResponseInterface> {
    const url = 'http://localhost:8080/rest/auth/authenticate';
    //TODO move to environment
    // const url = environment.apiUrl + '/authenticate';
    return this.http.post<AuthResponseInterface>(url, data);
  }

  handleAuthFailure(error: string) {
    console.log(error);
  }
}
