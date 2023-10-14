import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {LoginComponent} from './login/login.component';
import {PersistanceService} from 'src/app/services/persistance-service/persistance.service';
import {MaterialModule} from "../../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [{path: 'login', component: LoginComponent}];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, MaterialModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [LoginComponent],
  providers: [PersistanceService],
})
export class AuthModule {
}
