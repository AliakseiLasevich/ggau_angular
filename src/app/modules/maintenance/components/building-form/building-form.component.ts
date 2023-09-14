import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
    BuildingRequestInterface,
    BuildingResponseInterface,
} from 'src/app/shared/interfaces/buildings.interfaces';
import {
    createBuildingAction,
    updateBuildingAction,
} from 'src/app/shared/shared-store/shared-store.actions';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss'],
})
export class BuildingFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<BuildingResponseInterface>,
    @Inject(MAT_DIALOG_DATA)
    public data: { building: BuildingResponseInterface | null }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (this.data && this.data.building?.name) {
      this.form.get('name')?.setValue(this.data.building.name);
    }
  }

  onSubmit() {
    const request: BuildingRequestInterface = {
      name: this.form.get('name')?.value,
      publicId: this.data.building?.publicId || null,
    };

    if (this.form.valid && this.data.building?.publicId) {
      this.store.dispatch(updateBuildingAction({ building: request }));
    } else if (this.form.valid) {
      this.store.dispatch(createBuildingAction({ building: request }));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
