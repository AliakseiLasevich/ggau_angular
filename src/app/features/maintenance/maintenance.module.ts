import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {BuildingFormComponent} from './building-form/building-form.component';
import {BuildingsComponent} from './buildings/buildings.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MaterialModule} from "../../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {HeaderModule} from "../header/header.module";
const routes: Routes = [{
  path: 'maintenance', component: MaintenanceComponent, children: [
    {path: 'buildings', component: BuildingsComponent}
  ]
}]

@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingFormComponent,
    ConfirmationDialogComponent,
    MaintenanceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HeaderModule,
    // EffectsModule.forFeature(PlannerStoreEffects),
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class MaintenanceModule {
}
