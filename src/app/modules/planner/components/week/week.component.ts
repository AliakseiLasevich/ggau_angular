import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import {
  getBuildingsAction,
  getLessonsAction,
} from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import { selectAllBuildings } from '../../store/planner.selectors';

export interface OneDayData {
  date: string;
  // lesson: LessonResponseInterface;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnChanges {
  @Input() filter: PlannerFilterInterface;

  dataSource: MatTableDataSource<OneDayData>;
  buildings$: Observable<BuildingResponseInterface[]>;
  displayedColumns: string[];

  constructor(private store: Store<PlannerState>) {
    this.buildings$ = this.store.select(selectAllBuildings);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(
      getLessonsAction({
        dateFrom: this.filter.fromDate,
        dateTo: this.filter.toDate,
      })
    );

    this.store.dispatch(getBuildingsAction());

    console.log(changes);
    const dateRange = this.dateRange();
    this.displayedColumns = dateRange; // Include 'date' and the rest of the dates in columns
    const data: OneDayData[] = dateRange.map((date) => ({ date: date }));
    this.dataSource = new MatTableDataSource(data);
  }

  dateRange(): string[] {
    const range: string[] = [];
    const currentDate = new Date(this.filter.fromDate);
    while (currentDate <= new Date(this.filter.toDate)) {
      range.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
