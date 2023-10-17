import { Component, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { BuildingResponseInterface } from 'src/app/core/models/buildings.interfaces';
import {PlannerStoreFacade} from "../../../store/planner-store/planner-store.facade";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    private plannerStoreFacade: PlannerStoreFacade,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { building: BuildingResponseInterface }
  ) {}

  confirmDelete() {
    this.plannerStoreFacade.deleteBuilding(this.data.building.publicId)
  }
}
