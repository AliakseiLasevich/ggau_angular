import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from './../header/header.module';
import { PlannerComponent } from './components/planner/planner.component';
import { CabinetsComponent } from './components/cabinets/cabinets.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { StoreModule } from '@ngrx/store';
import { plannerReducer } from './store/planner.reducer';
import { PlannerService } from './services/planner.service';
import { EffectsModule } from '@ngrx/effects';
import { PlannerEffects } from './store/planner.effect';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

const routes: Routes = [{ path: 'planner', component: PlannerComponent }];

@NgModule({
  declarations: [
    PlannerComponent,
    ToolbarComponent,
    CabinetsComponent,
    BuildingsComponent,
  ],
  imports: [
    HeaderModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('planner', plannerReducer),
    EffectsModule.forFeature(PlannerEffects),
  ],
  providers: [PlannerService],
})
export class PlannerModule {}
