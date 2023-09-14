import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { areDatesEqual } from 'src/app/shared/utils';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { PlannerState } from '../../store/planner.reducer';
import { CabinetResponseInterface } from 'src/app/shared/interfaces/cabinet.interfaces';
import { BuildingResponseInterface } from 'src/app/shared/interfaces/buildings.interfaces';
import { StudentCourseResponseInterface } from 'src/app/shared/interfaces/studentCourse.interfaces';
import { selectStudentCourses } from 'src/app/shared/shared-store/shared-store.selectors';

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
export class TableComponent implements OnInit, OnChanges {
  @Input() filter: PlannerFilterInterface | null;
  @Input() buildings: BuildingResponseInterface[] | null;
  @Input() lessons: LessonResponseInterface[] | null;

  studentCourses: Observable<StudentCourseResponseInterface[]>;

  dateRange: string[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(private store: Store<PlannerState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners() {
    this.studentCourses = this.store.select(selectStudentCourses);
  }

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
    building.cabinets?.forEach((cabinet) => {
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
  colorCellByType(type: string) {
    switch (type) {
      case 'PRACTICAL':
        return 'beige-bg';
      case 'LECTURE':
        return 'light-green-bg';
      case 'LABORATORY':
        return 'light-blue-bg';
      default:
        return 'white';
    }
  }

  studentsSummary: number;
}
