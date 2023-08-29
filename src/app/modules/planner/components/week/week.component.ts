import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { CabinetResponseInterface } from '../../interfaces/cabinet.interfaces';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { PlannerState } from '../../store/planner.reducer';

export interface PlannerCellDto {
  date: string;
  cabinet: CabinetResponseInterface;
  lesson: LessonResponseInterface | null;
}

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnChanges {
  @Input() filter: PlannerFilterInterface;
  @Input() buildings: BuildingResponseInterface[] | null;
  @Input() lessons: LessonResponseInterface[] | null;

  dateRange: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private store: Store<PlannerState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateDateRange();
    this.generateDataSource();
  }

  generateDataSource() {
    const result: any[] = [];

    if (this.buildings) {
      for (const building of this.buildings) {
        result.push(building);
        this.addCabinetsToDataSource(building, result);
      }
    }

    this.dataSource = new MatTableDataSource(result);
  }

  private addCabinetsToDataSource(
    building: BuildingResponseInterface,
    result: any[]
  ) {
    building.cabinets.forEach((cabinet) => {
      const row: { [key: string]: PlannerCellDto } = {};

      this.dateRange.forEach((date) => {
        const filtered = this.lessons
          ?.filter((lesson) => lesson.cabinet.publicId === cabinet.publicId)
          .filter((lesson) => this.areDatesEqual(lesson.date, date));

        if (filtered) {
          const lessonForCabinet = filtered.length > 0 ? filtered[0] : null;
          const cell: PlannerCellDto = {
            date,
            cabinet,
            lesson: lessonForCabinet,
          };
          row[date] = cell;
        }

        // const row: { [key: string]: PlannerCellDto } = {};
      });
      result.push(row);
    });
  }

  areDatesEqual(date1: number[], date2: string): boolean {
    const [year1, month1, day1] = date1;
    const [day2, month2, year2] = date2.split('.').map(Number);

    const jsDate1 = new Date(year1, month1 - 1, day1);
    const jsDate2 = new Date(year2, month2 - 1, day2);

    return jsDate1.getTime() === jsDate2.getTime();
  }

  isGroup(index: any, item: any): boolean {
    return item.name != null || item.name;
  }

  calculateDateRange() {
    const range: string[] = [];
    const currentDate = new Date(this.filter?.fromDate);
    while (currentDate <= new Date(this.filter?.toDate)) {
      range.push(new Date(currentDate).toLocaleDateString('ru-RU'));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.dateRange = range;
    return range;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generateTooltip(row: PlannerCellDto): string {
    const date = row.date;
    const name = row.lesson?.teacher.name;
    const subgroups = row.lesson?.studentSubgroups
      .map((subgroup) => subgroup.name)
      .join(',');
    if (date && name && subgroups) {
      return `${date} /  ${name} /  ${subgroups}`;
    }
    return '';
  }
}
