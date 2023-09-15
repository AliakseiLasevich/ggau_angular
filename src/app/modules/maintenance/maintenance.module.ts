import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedEffects } from 'src/app/shared/shared-store/shared-store.effects';
import { sharedReducer } from 'src/app/shared/shared-store/shared-store.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuildingFormComponent } from './components/building-form/building-form.component';
import { BuildingsComponent } from './components/buildings/buildings.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

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
    StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature(SharedEffects),
  ],
})
export class MaintenanceModule {}
