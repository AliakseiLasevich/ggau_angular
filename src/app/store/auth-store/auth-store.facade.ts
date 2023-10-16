import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AuthState} from "./auth.reducer";
import {Observable} from "rxjs";
import {BackendErrorInterface} from "../../core/models/backendErrors.interface";
import {selectAccessToken, selectError, selectIsLoading, selectIsLoggedIn, selectNameLastname} from "./auth.selectors";
import {loginAction} from "./auth.actions";
import {AuthRequestInterface} from "../../core/models/auth.interfaces";

@Injectable({
  providedIn: 'root',
})
export class AuthStoreFacade {

  loggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  accessToken$: Observable<string> = this.store.select(selectAccessToken);
  // refreshToken: Observable<string> = this.store.select(selectRe);;
  name: Observable<string> = this.store.select(selectNameLastname);
  error: Observable<BackendErrorInterface | null> = this.store.select(selectError);

  constructor(private store: Store<AuthState>) {
  }

  login(userData: AuthRequestInterface ) {
    this.store.dispatch(loginAction({userData}));
  }
}
