import { NgModule } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomDateAdapter } from 'src/app/shared/features/date-adapter';
import { CustomRangeSelectionStrategy } from 'src/app/shared/features/date-range-selection-strategy';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from './../header/header.module';
import { PlannerComponent } from './components/planner/planner.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WeekComponent } from './components/week/week.component';
import { PlannerService } from './services/planner.service';
import { PlannerEffects } from './store/planner.effect';
import { plannerReducer } from './store/planner.reducer';

const routes: Routes = [{ path: 'planner', component: PlannerComponent }];

@NgModule({
  declarations: [PlannerComponent, ToolbarComponent, WeekComponent],
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
      useClass: CustomRangeSelectionStrategy,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class PlannerModule {}
