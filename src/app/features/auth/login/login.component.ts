import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../../../store/auth-store/auth.reducer';
import {selectError} from '../../../store/auth-store/auth.selectors';
import {AuthStoreFacade} from "../../../store/auth-store/auth-store.facade";

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
    private _snackBar: MatSnackBar,
    private authFacade: AuthStoreFacade
  ) {
  }

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
        this._snackBar.open(error.message, 'OK', {duration: 2 * 1000});
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authFacade.login(this.form.value);

    }
  }
}
