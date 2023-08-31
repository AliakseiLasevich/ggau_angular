import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [LoginComponent],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
