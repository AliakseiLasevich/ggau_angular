import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BuildingResponseInterface} from '../../../core/models/buildings.interfaces';
import {MatDialog} from '@angular/material/dialog';
import {BuildingFormComponent} from '../building-form/building-form.component';
import {PlannerStoreFacade} from "../../../store/planner-store/planner-store.facade";

@Component({
  selector: 'app-buildings-table',
  templateUrl: './buildings-table.component.html',
  styleUrls: ['./buildings-table.component.scss'],
})
export class BuildingsTableComponent implements OnInit, OnDestroy {
  columnsSchema: any = COLUMNS_SCHEMA;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  buildings$: Observable<BuildingResponseInterface[]> = this.plannerStoreFacade.buildings$;
  buildings: BuildingResponseInterface[];
  subscriptions: Subscription[] = [];

  constructor(private plannerStoreFacade: PlannerStoreFacade, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  openBuildingForm(building?: BuildingResponseInterface): void {
    this.dialog.open(BuildingFormComponent, {
      data: {building: building || null},
    });
  }

  private fetchData() {
    this.plannerStoreFacade.fetchBuildings();
  }

  private initializeSubscriptions() {
    const buildingsSubscription = this.buildings$.subscribe(buildings => this.buildings = buildings)
    this.subscriptions.push(buildingsSubscription);
  }
}

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Корпус',
  },
];
