import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../../store/auth.actions';
import { AuthState } from '../../store/auth.reducer';

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
    // this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(loginAction({ userData: this.form.value }));
    }
  }
}
