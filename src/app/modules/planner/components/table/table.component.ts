import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { areDatesEqual } from 'src/app/shared/utils';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { CabinetResponseInterface } from '../../interfaces/cabinet.interfaces';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { PlannerState } from '../../store/planner.reducer';
import { PlannerButtonDto } from '../planner-button/planner-button.component';

export interface PlannerRowDto {
  date: string;
  cabinet: CabinetResponseInterface;
  lessons: LessonResponseInterface[] | null;
}

@Component({
  selector: 'app-week',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() filter: PlannerFilterInterface | null;
  @Input() buildings: BuildingResponseInterface[] | null;
  @Input() lessons: LessonResponseInterface[] | null;

  buttonDtos$: Observable<PlannerButtonDto[]>;

  dateRange: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private store: Store<PlannerState>, public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']?.currentValue) {
      this.calculateDateRange();
    }
    this.generateDataSource();
  }

  generateDataSource(): void {
    const result: (
      | BuildingResponseInterface
      | Record<string, PlannerRowDto>
    )[] = [];

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
    result: (BuildingResponseInterface | Record<string, PlannerRowDto>)[]
  ): void {
    building.cabinets.forEach((cabinet) => {
      const row: { [key: string]: PlannerRowDto } = {};

      this.dateRange.forEach((date) => {
        const filteredByDateAndCabinet = this.lessons
          ?.filter((lesson) => lesson.cabinet.publicId === cabinet.publicId)
          .filter((lesson) => areDatesEqual(lesson.date, date));
        if (filteredByDateAndCabinet) {
          const tableRow: PlannerRowDto = {
            date,
            cabinet,
            lessons: filteredByDateAndCabinet,
          };
          row[date] = tableRow;
        }
      });

      result.push(row);
    });
  }

  isGroup(index: any, item: any): boolean {
    return item.name != null || item.name;
  }

  calculateDateRange(): string[] {
    const range: string[] = [];
    const currentDate = new Date(this.filter!.fromDate);
    while (currentDate <= new Date(this.filter!.toDate)) {
      range.push(new Date(currentDate).toLocaleDateString('ru-RU'));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.dateRange = range;
    return range;
  }

  // generateTooltip(row: PlannerRowDto): string {
  //   const date = row.date;
  //   const name = row.lesson?.teacher.name;
  //   const subgroups = row.lesson?.studentSubgroups
  //     .map((subgroup) => subgroup.name)
  //     .join(',');
  //   if (date && name && subgroups) {
  //     return `${date} /  ${name} /  ${subgroups}`;
  //   }
  //   return '';
  // }
  studentsSummary: number;
}
