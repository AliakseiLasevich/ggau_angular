import {NgModule} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from '@angular/material/datepicker';
import {RouterModule, Routes} from '@angular/router';
import {CustomDateAdapter} from 'src/app/shared/features/date-adapter';
import {CustomRangeSelectionStrategy} from 'src/app/shared/features/date-range-selection-strategy';
import {SharedModule} from 'src/app/shared/shared.module';
import {HeaderModule} from './../header/header.module';
import {PlannerFormComponent} from './planner-form/planner-form.component';
import {LessonInfoComponent} from './lesson-info/lesson-info.component';
import {PlannerComponent} from './planner/planner.component';
import {WeekTableComponent} from './week-table/week-table.component';
import {PlannerButtonComponent} from './planner-button/planner-button.component';
import {TableCellComponent} from './table-cell/table-cell.component';
import {NewLessonFormComponent} from './new-lesson-form/new-lesson-form.component';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {LessonEffects} from "../../store/lessons-store/lesson.effect";
import {StoreModule} from "@ngrx/store";
import {lessonsReducer} from "../../store/lessons-store/lesson.reducer";

const routes: Routes = [{path: 'planner', component: PlannerComponent}];

@NgModule({
  declarations: [
    PlannerComponent,
    PlannerFormComponent,
    WeekTableComponent,
    LessonInfoComponent,
    PlannerButtonComponent,
    TableCellComponent,
    NewLessonFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeaderModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EffectsModule.forFeature(LessonEffects),

  ],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: CustomRangeSelectionStrategy,
    },
    {provide: DateAdapter, useClass: CustomDateAdapter},
  ],
})
export class PlannerModule {
}
