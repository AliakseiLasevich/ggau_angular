import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedEffects } from 'src/app/store/planner-store/planner-store.effects';
import { plannerReducer } from 'src/app/store/planner-store/planner-store.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingFormComponent } from './building-form/building-form.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

const routes: Routes = [{ path: 'buildings', component: BuildingsComponent }];
@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingFormComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('shared', plannerReducer),
    EffectsModule.forFeature(SharedEffects),
  ],
})
export class MaintenanceModule {}
