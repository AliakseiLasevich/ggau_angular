import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '../interfaces/auth.interfaces';
import { PersistanceService } from './../../../shared/services/persistance.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActionTypes } from './auth.actionTypes';
import { loginFailure, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOGIN),
      switchMap(({ userData }) => {
        return this.authService.authenticate(userData).pipe(
          map((response: AuthResponseInterface) =>
            loginSuccess({
              access_token: response.access_token,
              refresh_token: response.refresh_token,
              name: response.name,
              lastname: response.lastname,
            })
          ),
          catchError((error) => {
            return of(loginFailure(error));
          })
        );
      })
    )
  );

  storeTokenInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LOGIN_SUCCESS),
        tap((response: AuthResponseInterface) => {
          this.storeToken(response);
          this.router.navigateByUrl('/planner')
        })
      ),
    { dispatch: false }
  );

  private storeToken(response: AuthResponseInterface) {
    this.persistanceService.set('token', response.access_token.token);
    this.persistanceService.set('token', response.access_token.token);
    this.persistanceService.set(
      'token_expiresIn',
      response.access_token.expires_in.toString()
    );
    this.persistanceService.set('refresh_token', response.refresh_token.token);
    this.persistanceService.set(
      'refresh_expires_in',
      response.refresh_token.expires_in.toString()
    );
    this.persistanceService.set('name', response.name);
    this.persistanceService.set('lastname', response.lastname);
  }
}
