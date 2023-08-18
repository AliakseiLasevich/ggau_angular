import { HeaderModule } from './../header/header.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PlannerComponent } from './planner/planner.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'planner', component: PlannerComponent }];

@NgModule({
  declarations: [PlannerComponent],
  imports: [HeaderModule, SharedModule, RouterModule.forChild(routes)],
})
export class PlannerModule {}
