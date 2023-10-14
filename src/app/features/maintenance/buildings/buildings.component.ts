import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAllBuildings } from 'src/app/store/planner-store/planner-store.selectors';
import { BuildingResponseInterface } from '../../../core/models/buildings.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { BuildingFormComponent } from '../building-form/building-form.component';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
})
export class BuildingsComponent implements OnInit {
  columnsSchema: any = COLUMNS_SCHEMA;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  buildings: BuildingResponseInterface[];

  buildingsSubscription: Subscription;

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.buildingsSubscription = this.store
      .select(selectAllBuildings)
      .subscribe((buildings) => {
        this.buildings = buildings;
      });
  }

  ngOnDestroy(): void {
    this.buildingsSubscription.unsubscribe();
  }

  openBuildingForm(building?: BuildingResponseInterface): void {
    this.dialog.open(BuildingFormComponent, {
      data: { building: building || null },
    });
  }
}

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Корпус',
  },
];
