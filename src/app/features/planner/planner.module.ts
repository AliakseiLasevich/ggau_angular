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
import { FilterComponent } from './filter/filter.component';
import { LessonInfoComponent } from './lesson-info/lesson-info.component';
import { PlannerComponent } from './planner/planner.component';
import { TableComponent } from './table/table.component';
import { PlannerService } from '../../services/planner-services/planner.service';
import { PlannerEffects } from '../../store/lessons-store/lesson.effect';
import { lessonsReducer } from '../../store/lessons-store/lesson.reducer';
import { PlannerButtonComponent } from './planner-button/planner-button.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { NewLessonFormComponent } from './new-lesson-form/new-lesson-form.component';

const routes: Routes = [{ path: 'planner', component: PlannerComponent }];

@NgModule({
  declarations: [
    PlannerComponent,
    FilterComponent,
    TableComponent,
    LessonInfoComponent,
    PlannerButtonComponent,
    TableCellComponent,
    NewLessonFormComponent,
  ],
  imports: [
    HeaderModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('planner', lessonsReducer),
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
