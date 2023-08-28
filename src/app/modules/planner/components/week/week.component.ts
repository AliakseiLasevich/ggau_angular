import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { getLessonsAction } from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';

export interface OneDayData {
  date: string;
  buildings: BuildingResponseInterface[];
  // lesson: LessonResponseInterface;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnChanges {
  @Input() filter: PlannerFilterInterface;
  @Input() buildings: BuildingResponseInterface[] | null;
  dateRange: string[];
  dateRange$: Observable<string[]>;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor(private store: Store<PlannerState>) {
    this.dateRange = [];
    this.calculateDateRange();
    this.dateRange$ = of(this.calculateDateRange());
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(
      getLessonsAction({
        dateFrom: this.filter?.fromDate,
        dateTo: this.filter?.toDate,
      })
    );

    this.calculateDateRange();
    this.drawTable();
  }

  drawTable() {
    const result: any[] = [];
    this.buildings?.forEach((building) => {
      const buildingEntries: { [key: string]: string } = {};
      this.dateRange.forEach((date) => {
        buildingEntries[date] = building.name;
      });

      result.push(buildingEntries);
    });

    this.dataSource = new MatTableDataSource(result);
  }

  calculateDateRange() {
    const range: string[] = [];
    const currentDate = new Date(this.filter?.fromDate);
    while (currentDate <= new Date(this.filter?.toDate)) {
      range.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.dateRange = range;
    return range;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
