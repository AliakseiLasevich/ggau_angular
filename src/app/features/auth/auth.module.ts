import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../../services/auth-services/auth.service';
import { PersistanceService } from 'src/app/services/persistance-service/persistance.service';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [LoginComponent],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
