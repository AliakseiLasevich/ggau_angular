import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import { loginAction } from '../../../store/auth-store/auth.actions';
import { AuthState } from '../../../store/auth-store/auth.reducer';
import { selectError } from '../../../store/auth-store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  alphaNumericPattern = /^[a-zA-Z0-9]*$/;

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
    this.store.pipe(select(selectError)).subscribe((error) => {
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