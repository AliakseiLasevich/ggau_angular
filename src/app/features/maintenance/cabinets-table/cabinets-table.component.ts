import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {BuildingResponseInterface} from "../../../core/models/buildings.interfaces";
import {CabinetDto} from "../../../core/models/cabinet.interfaces";
import {PlannerStoreFacade} from "../../../store/planner-store/planner-store.facade";
import {CabinetFormComponent} from "../cabinet-form/cabinet-form.component";

@Component({
  selector: 'app-cabinets-table',
  templateUrl: './cabinets-table.component.html',
  styleUrls: ['./cabinets-table.component.scss']
})
export class CabinetsTableComponent implements OnInit, OnDestroy {
  columnsSchema: any = COLUMNS_SCHEMA;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  subscriptions: Subscription[] = [];
  cabinets: CabinetDto[];
  buildings$: Observable<BuildingResponseInterface[]> = this.plannerStoreFacade.buildings$;

  constructor(private plannerStoreFacade: PlannerStoreFacade, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeSubscriptions();
    this.fetchData();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private fetchData() {
    this.plannerStoreFacade.fetchBuildings();
  }

  private initializeSubscriptions() {
    const cabinetsSubscription = this.buildings$
      .pipe(
        map(buildings => buildings.flatMap(building => {
            const {publicId: buildingId, name: buildingName} = building;
            return building.cabinets.map(cabinet => ({
              ...cabinet,
              buildingId,
              buildingName
            } as CabinetDto));
          })
        ))
      .subscribe(cabinets => {
        this.cabinets = cabinets
      })
    this.subscriptions.push(cabinetsSubscription);
  }

  openCabinetForm(cabinet?: CabinetDto): void {
    this.dialog.open(CabinetFormComponent, {
      data: {cabinet: cabinet || null},
    });
  }
}

const COLUMNS_SCHEMA = [
  {
    key: 'buildingName',
    type: 'text',
    label: 'Корпус',
  },
  {
    key: 'number',
    type: 'text',
    label: 'Номер кабинета',
  }, {
    key: 'type',
    type: 'text',
    label: 'Тип',
  }, {
    key: 'maxStudents',
    type: 'text',
    label: 'Кол-во Мест',
  },
];
