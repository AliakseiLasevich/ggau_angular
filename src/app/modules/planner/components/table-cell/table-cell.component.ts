import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonOrder } from 'src/app/shared/enums/lesson-order.enum';
import { anyCommonValue, areDatesEqual } from 'src/app/shared/utils';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { selectStudentCountBySubgroups } from '../../store/planner.selectors';
import { PlannerButtonDto } from '../planner-button/planner-button.component';
import { PlannerRowDto } from '../table/table.component';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent {
  @Input() filter: PlannerFilterInterface;
  @Input() lessons: LessonResponseInterface[] | null;
  @Input() date: string;
  @Input() row: Record<string, PlannerRowDto>;

  filterStudentsCount: number;

  constructor(private store: Store) {}

  orderNumbers = LessonOrder;

  generateButtonDto(order: string): PlannerButtonDto {
    const cell = this.row[this.date];

    const dayLessons = this.lessons
      ?.filter((lesson: LessonResponseInterface) =>
        areDatesEqual(lesson.date, this.date)
      )
      .filter((lesson) => lesson.orderNumber === parseInt(order));

    const isTeacherBooked = dayLessons?.some(
      (lesson) => lesson.teacher.publicId === this.filter?.selectedTeacher
    );

    const lessonSubgroupIds =
      dayLessons
        ?.flatMap((lesson) => lesson.studentSubgroups)
        .map((subgroup) => subgroup.publicId) || [];

    const filterSubgroupIds = this.filter!.dynamicGroups.flatMap(
      (group) => group.subgroupIds || []
    );

    this.store
      .select(selectStudentCountBySubgroups(filterSubgroupIds))
      .subscribe((count) => (this.filterStudentsCount = count));

    const isOneOfSubgroupsBooked = anyCommonValue(
      lessonSubgroupIds,
      filterSubgroupIds
    );

    const isNotEnoughSittingPlaces =
      cell.cabinet.maxStudents < this.filterStudentsCount;

    let cabinetBookedBySomeone = false;
    let lessonOnButton = null;
    let isTeacherBookedForThisLesson = false;

    if (cell.lessons) {
      let cellLesson = this.findLessonByOrderNumber(
        cell.lessons,
        parseInt(order)
      );
      if (cellLesson) {
        isTeacherBookedForThisLesson =
          cellLesson.teacher.publicId === this.filter!.selectedTeacher;
        cabinetBookedBySomeone = !isTeacherBookedForThisLesson;
        lessonOnButton = cellLesson;
      }
    }

    const logo = this.generateLessonButtonText(
      isTeacherBooked,
      isOneOfSubgroupsBooked,
      cabinetBookedBySomeone,
      cell.cabinet.maxStudents - this.filterStudentsCount
    );

    return {
      color: this.calculateLessonButtonColor(
        isTeacherBookedForThisLesson,
        isTeacherBooked,
        isOneOfSubgroupsBooked,
        isNotEnoughSittingPlaces,
        cabinetBookedBySomeone
      ),
      logo: logo,
      description: 'some',
      orderTime: LessonOrder[parseInt(order) as keyof typeof LessonOrder],
      lesson: lessonOnButton,
    };
  }

  generateLessonButtonText(
    isTeacherBooked: boolean | undefined,
    isOneOfSubgroupsBooked: boolean,
    cabinetBookedBySomeone: boolean,
    extraSits: number
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
    return '' + extraSits;
  }

  calculateLessonButtonColor(
    isTeacherBookedForThisLesson: boolean,
    isTeacherBooked: boolean | undefined,
    isOneOfSubgroupsBooked: boolean,
    isNotEnoughSittingPlaces: boolean,
    cabinetBookedBySomeone: boolean
  ) {
    if (isTeacherBookedForThisLesson) {
      return 'warn';
    }
    if (isTeacherBooked || isOneOfSubgroupsBooked) {
      return 'grey';
    }
    if (cabinetBookedBySomeone) {
      return 'primary';
    }
    if (isNotEnoughSittingPlaces) {
      return 'accent';
    }

    return 'success';
  }

  findLessonByOrderNumber(
    lessons: LessonResponseInterface[],
    orderNumber: number
  ): LessonResponseInterface | undefined {
    return lessons.find((lesson) => lesson.orderNumber === orderNumber);
  }
}
