import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '../interfaces/auth.interfaces';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActionTypes } from './actionTypes';
import { loginFailure, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOGIN),
      switchMap(({ userData }) => {
        return this.authService.authenticate(userData).pipe(
          map((response: AuthResponseInterface) =>
            loginSuccess({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              name: response.name,
              lastname: response.lastname,
            })
          ),
          catchError((error) => {
            this.authService.handleAuthFailure(error);
            return of(loginFailure(error.message));
          })
        );
      })
    )
  );
}
