import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { getLessonsAction } from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import { CabinetResponseInterface } from '../../interfaces/cabinet.interfaces';

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
  dateRange: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private store: Store<PlannerState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(
      getLessonsAction({
        dateFrom: this.filter.fromDate,
        dateTo: this.filter.toDate,
      })
    );

    this.calculateDateRange();
    this.generateDataSource();
  }

  generateDataSource() {
    const result: any[] = [];

    if (this.buildings) {
      for (const building of this.buildings) {
        result.push(building);

        building.cabinets.forEach((cabinet) => {
          const row: { [key: string]: CabinetResponseInterface } = {};

          this.dateRange.forEach((date) => {
            row[date] = cabinet;
          });

          result.push(row);
        });
      }
    }

    this.dataSource = new MatTableDataSource(result);
  }

  isGroup(index: any, item: any): boolean {
    return item.name != null || item.name;
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
