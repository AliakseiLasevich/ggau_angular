import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from './../header/header.module';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { CabinetsComponent } from './components/cabinets/cabinets.component';
import { PlannerComponent } from './components/planner/planner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PlannerService } from './services/planner.service';
import { PlannerEffects } from './store/planner.effect';
import { plannerReducer } from './store/planner.reducer';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { FiveDayRangeSelectionStrategy } from 'src/app/shared/features/date-range-selection-strategy';

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
  providers: [
    PlannerService,
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class PlannerModule {}
