import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from './../header/header.module';
import { PlannerComponent } from './planner/planner.component';

const routes: Routes = [{ path: 'planner', component: PlannerComponent }];

@NgModule({
  declarations: [PlannerComponent],
  imports: [HeaderModule, SharedModule, RouterModule.forChild(routes)],
})
export class PlannerModule {}
