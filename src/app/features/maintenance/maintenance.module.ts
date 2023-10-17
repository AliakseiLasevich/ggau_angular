import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {BuildingFormComponent} from './building-form/building-form.component';
import {BuildingsTableComponent} from './buildings-table/buildings-table.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MaterialModule} from "../../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {HeaderModule} from "../header/header.module";
import {CabinetsTableComponent} from './cabinets-table/cabinets-table.component';
import { CabinetFormComponent } from './cabinet-form/cabinet-form.component';

const routes: Routes = [{
  path: 'maintenance', component: MaintenanceComponent, children: [
    {path: 'buildings', component: BuildingsTableComponent},
    {path: 'cabinets', component: CabinetsTableComponent},
  ]
}]

@NgModule({
  declarations: [
    BuildingsTableComponent,
    BuildingFormComponent,
    ConfirmationDialogComponent,
    MaintenanceComponent,
    CabinetsTableComponent,
    CabinetFormComponent,
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
