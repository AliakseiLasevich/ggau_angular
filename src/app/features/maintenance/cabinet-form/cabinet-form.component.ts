import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CabinetTypes } from 'src/app/core/enums/cabinet-types.enum';
import {
  BuildingRequestInterface,
  BuildingResponseInterface,
} from '../../../core/models/buildings.interfaces';
import { CabinetDto } from '../../../core/models/cabinet.interfaces';
import { PlannerStoreFacade } from '../../../store/planner-store/planner-store.facade';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cabinet-form',
  templateUrl: './cabinet-form.component.html',
  styleUrls: ['./cabinet-form.component.scss'],
})
export class CabinetFormComponent implements OnInit {
  form: FormGroup;
  buildings$: Observable<BuildingResponseInterface[]> =
    this.plannerStoreFacade.buildings$;
  cabinetTypes = CabinetTypes;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private plannerStoreFacade: PlannerStoreFacade,
    public dialogRef: MatDialogRef<CabinetDto>,
    @Inject(MAT_DIALOG_DATA)
    public data: { cabinet: CabinetDto | null }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  getLessonTypesArray() {
    return Object.keys(this.cabinetTypes).map((key) => ({
      key,
      value: this.cabinetTypes[key],
    }));
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      number: [null, [Validators.required]],
      type: [null, [Validators.required]],
      maxStudents: [null, [Validators.required]],
      buildingId: [null, [Validators.required]],
    });

    if (this.data && this.data.cabinet?.publicId) {
      this.form.get('number')?.setValue(this.data.cabinet.number);
      this.form.get('type')?.setValue(this.data.cabinet.type);
      this.form.get('maxStudents')?.setValue(this.data.cabinet.maxStudents);
      this.form.get('buildingId')?.setValue(this.data.cabinet.buildingId);
    }
  }

  onSubmit() {
    const request: BuildingRequestInterface = {
      name: this.form.get('name')?.value,
      publicId: this.data.cabinet?.publicId || null,
    };

    if (this.form.valid && this.data.cabinet?.publicId) {
      this.plannerStoreFacade.updateBuilding(request);
    } else if (this.form.valid) {
      this.plannerStoreFacade.createBuilding(request);
    }
  }

  openDeleteDialog() {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { cabinet: this.data.cabinet },
    });
  }
}
