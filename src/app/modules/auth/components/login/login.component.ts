import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
import { loginAction } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.reducer';
import { selectErrors } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  alphaNumericPattern = /^[a-zA-Z0-9]*$/;
  backendError$: Observable<BackendErrorInterface | null>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AuthState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      login: [
        null,
        [Validators.required, Validators.pattern(this.alphaNumericPattern)],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  initializeValues() {
    this.store.pipe(select(selectErrors)).subscribe((error) => {
      if (error) {
        this._snackBar.open(error.message, 'OK', { duration: 2 * 1000 });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(loginAction({ userData: this.form.value }));
    }
  }
}
