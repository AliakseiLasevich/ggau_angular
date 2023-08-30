import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { LessonOrder } from 'src/app/shared/enums/lesson-order.enum';
import { BuildingResponseInterface } from '../../interfaces/buildings.interfaces';
import { CabinetResponseInterface } from '../../interfaces/cabinet.interfaces';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { PlannerState } from '../../store/planner.reducer';
import { selectStudentCountBySubgroups } from '../../store/planner.selectors';
import { LessonInfoComponent } from '../lesson-info/lesson-info.component';

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
  orderNumbers = LessonOrder;
  filterStudentsCount: number;

  constructor(private store: Store<PlannerState>, public dialog: MatDialog) {}

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
  studentsSummary: number;

  matchCabinetToFilter(lesson: CabinetResponseInterface) {
    const subgrouIds: string[] = this.filter.dynamicGroups.flatMap(
      (group) => group.subgroupIds
    );
    this.store
      .select(selectStudentCountBySubgroups(subgrouIds))
      .subscribe((students) => (this.studentsSummary = students));

    return this.studentsSummary < lesson.maxStudents ? 'success' : 'accent';
  }

  openLessonDetailsDialog(lesson: LessonResponseInterface): void {
    const dialogRef = this.dialog.open(LessonInfoComponent, {
      data: { lesson: lesson },
    });
  }

  generateButtonDto(date: string, row: any, order: string) {
    const dayLessons = this.lessons
      ?.filter((lesson: LessonResponseInterface) =>
        this.areDatesEqual(lesson.date, date)
      )
      .filter((lesson) => lesson.orderNumber === parseInt(order));

    const isTeacherBooked = dayLessons?.some(
      (lesson) => lesson.teacher.publicId === this.filter.selectedTeacher
    );

    const lessonSubgroupIds =
      dayLessons
        ?.flatMap((lesson) => lesson.studentSubgroups)
        .map((subgroup) => subgroup.publicId) || [];

    const filterSubgroupIds = this.filter.dynamicGroups.flatMap(
      (group) => group.subgroupIds || []
    );

    this.store
      .select(selectStudentCountBySubgroups(filterSubgroupIds))
      .subscribe((count) => (this.filterStudentsCount = count));

    const isOneOfSubgroupsBooked = this.hasCommonValue(
      lessonSubgroupIds,
      filterSubgroupIds
    );

    const isNotEnoughSittingPlaces =
      row.cabinet.maxStudents <= this.filterStudentsCount;

    let cabinetBookedBySomeone = false;
    if (row.lesson) {
      cabinetBookedBySomeone =
        row.lesson.teacher.publicId !== this.filter.selectedTeacher &&
        row.lesson.orderNumber === parseInt(order);
    }

    const logo = this.generateLogo(
      isTeacherBooked,
      isOneOfSubgroupsBooked,
      cabinetBookedBySomeone
    );

    return {
      color: this.calculateColor(
        isTeacherBooked,
        isOneOfSubgroupsBooked,
        isNotEnoughSittingPlaces,
        cabinetBookedBySomeone
      ),
      logo: logo,
      description: 'some',
      onClickFunction: this.voidFunction,
    };
  }
  calculateColor(
    isTeacherBooked: boolean | undefined,
    isOneOfSubgroupsBooked: boolean,
    isNotEnoughSittingPlaces: boolean,
    cabinetBookedBySomeone: boolean
  ) {
    if (isTeacherBooked || isOneOfSubgroupsBooked) {
      return 'warn';
    }
    if (cabinetBookedBySomeone) {
      return 'primary';
    }
    if (isNotEnoughSittingPlaces) {
      return 'accent';
    }

    return 'success';
  }

  hasCommonValue(array1: any[], array2: any[]): boolean {
    for (const value of array1) {
      if (array2.includes(value)) {
        return true;
      }
    }
    return false;
  }

  voidFunction() {}

  generateLogo(
    isTeacherBooked: boolean | undefined,
    isOneOfSubgroupsBooked: boolean,
    cabinetBookedBySomeone: boolean
  ): string {
    if (isTeacherBooked && isOneOfSubgroupsBooked) {
      return 'П/С';
    }
    if (isTeacherBooked) {
      return 'П';
    }
    if (isOneOfSubgroupsBooked) {
      return 'С';
    }
    if (cabinetBookedBySomeone) {
      return 'X';
    }
    return '✔';
  }
}
