import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonOrder } from 'src/app/shared/enums/lesson-order.enum';
import { anyCommonValue, areDatesEqual } from 'src/app/shared/utils';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { PlannerFilterInterface } from '../../interfaces/planner-filter.interfaces';
import { PlannerButtonDto } from '../planner-button/planner-button.component';
import { PlannerRowDto } from '../table/table.component';
import { StudentCourseResponseInterface } from 'src/app/shared/interfaces/studentCourse.interfaces';

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
  @Input() studentCourses!: StudentCourseResponseInterface[] | null;

  orderNumbers = LessonOrder;

  constructor(private store: Store) {}

  /*
Генерирует данные для кнопки, отвечающей за занятие по времени (order).Т.е, например, это 1 занятие (8:00 - 9:20). 
Надо понять, свободен ли преподаватель в это время,в этот день(ячейка определяет день). Определить, все ли подгруппы 
из фильтра свободны в это время в этот день. 
Кейсы:
1. В дне ячейки в указанном порядке(order) и преподаватель, и все подгруппы свободны. Кабинет при этом никем не занят:
   кнопка окрашивается в зелёный если мест в кабинете хватает, жёлтым - если мест в кабинете не хватает. На кнопке отображается
   разница, сколько лишних мест или сколько мест не хватает.
2. В дне ячейки в указанном порядке(order) и преподаватель, и все подгруппы свободны. Кабинет при этом занят. 
   Кнопка окрашивается в красный с символом X
3. В дне ячейки в указанном порядке заняты либо преподаватель, либо одна из подгрупп студентов. Кнопка окрашивается в синий цвет.
   Символ на кнопке означает, кто именно "занят" в это время в этом месте: С - хотя бы одна из подгрупп из фильтра, П - преподаватель
   П/С - Выбранный преподаватель ведёт занятие хотя бы у одной из выбранных подгрупп в это время, в день этой ячейки, в выбранном кабинете
4. В дней ячейки в указаном порядке хотя бы одна подгруппа из фильтра занята, либо занят преподаватель. В этом случае весь столбец,
   отвечающий за указанное время(порядок) окрашивается в серый цвет, т.к. это время недоступно. При этом остаётся возможность
   при нажатии на кнопку посмотреть, кем занят кабинет в это время.
*/
  generateButtonDto(order: string): PlannerButtonDto {
    const cell = this.row[this.date];

    //Выбираем занятия на дату в ячейке, оставляем только нужное занятие по порядку (orderNumber)
    const dayOrderLessons = this.lessons
      ?.filter((lesson: LessonResponseInterface) =>
        areDatesEqual(lesson.date, this.date)
      )
      .filter((lesson) => lesson.orderNumber === parseInt(order));

    // Определяем, занят ли учитель хотя бы в одном из найденных занятий
    const isTeacherBooked = dayOrderLessons?.some(
      (lesson) => lesson.teacher.publicId === this.filter?.selectedTeacher
    );

    //Выбираем все подгруппы, которые уже заняты в дату ячейки
    const lessonSubgroupIds =
      dayOrderLessons
        ?.flatMap((lesson) => lesson.studentSubgroups)
        .map((subgroup) => subgroup.publicId) || [];

    // Выбираем все id подгрупп, которые выбраны в фильтре
    const filterSubgroupIds = this.filter!.dynamicGroups.flatMap(
      (group) => group.subgroupIds || []
    );

    // Определяем количество студентов в подгруппах фильтра
    const filterStudentsCount =
      this.calculateStudentsInFilter(filterSubgroupIds);

    // Определяем, заняты ли какие-либо из подгрупп фильтра в найденых занятиях (по дате и времени)
    const isOneOfSubgroupsBooked = anyCommonValue(
      lessonSubgroupIds,
      filterSubgroupIds
    );

    // Определяем, хватает ли в кабинете мест для студентов всех подгрупп фильтра
    const isNotEnoughSittingPlaces =
      cell.cabinet.maxStudents < filterStudentsCount;

    //Кабинет забукан другим учителем
    let cabinetBookedByOtherTeacher = false;

    //
    let lessonOnButton = null;
    let isTeacherBookedForThisLesson = false;
    let cabinetBookedByOneOfFilterSubgroups = false;

    if (cell.lessons) {
      let cellLesson = this.findLessonByOrderNumber(
        cell.lessons,
        parseInt(order)
      );
      if (cellLesson) {
        isTeacherBookedForThisLesson =
          cellLesson.teacher.publicId === this.filter!.selectedTeacher;
        cabinetBookedByOtherTeacher = !isTeacherBookedForThisLesson;
        cabinetBookedByOneOfFilterSubgroups = anyCommonValue(
          cellLesson.studentSubgroups.map((subgroup) => subgroup.publicId),
          filterSubgroupIds
        );
        lessonOnButton = cellLesson;
      }
    }

    const logo = this.generateLessonButtonText(
      isTeacherBookedForThisLesson,
      cabinetBookedByOtherTeacher,
      cell.cabinet.maxStudents - filterStudentsCount,
      cabinetBookedByOneOfFilterSubgroups
    );

    return {
      color: this.calculateLessonButtonColor(
        isTeacherBookedForThisLesson,
        isTeacherBooked,
        isOneOfSubgroupsBooked,
        isNotEnoughSittingPlaces,
        cabinetBookedByOtherTeacher,
        cabinetBookedByOneOfFilterSubgroups
      ),
      logo: logo,
      description: 'some',
      orderNumber: order,
      orderTime: LessonOrder[parseInt(order) as keyof typeof LessonOrder],
      lesson: lessonOnButton,
      cabinetId: cell.cabinet.publicId,
      date: cell.date,
    };
  }

  calculateStudentsInFilter(subgroupIds: string[]): number {
    if (subgroupIds && this.studentCourses) {
      return this.studentCourses
        .flatMap((course) => course.studentGroups)
        .flatMap((group) => group.studentSubgroups)
        .filter((subgroup) => subgroupIds.includes(subgroup.publicId))
        .map((subgroup) => subgroup.studentsCount)
        .reduce((sum, current) => sum + current, 0);
    }
    return 0;
  }

  generateLessonButtonText(
    isTeacherBookedForThisLesson: boolean | undefined,
    cabinetBookedByOtherTeacher: boolean,
    extraSits: number,
    cabinetBookedByOneOfFilterSubgroups: boolean
  ): string {
    //3 кейс. Если кабинет занят преподавателем из фильтра и хотя бы одной из подгрупп фильтра
    if (isTeacherBookedForThisLesson && cabinetBookedByOneOfFilterSubgroups) {
      return 'П/С';
    }

    //3 кейс. Если кабинет занят преподавателем из фильтра
    if (isTeacherBookedForThisLesson) {
      return 'П';
    }

    //3 кейс. Если кабинет занят одной из подгрупп из фильтра
    if (cabinetBookedByOneOfFilterSubgroups) {
      return 'С';
    }

    //2 кейс, когда кабинет занят другим преподавателем. Студенты не проверяются, т.к. любое занятие имеет преподавателя
    if (cabinetBookedByOtherTeacher) {
      return 'X';
    }

    //1 кейс, когда кабинет никем не занят
    return '' + extraSits;
  }

  calculateLessonButtonColor(
    isTeacherBookedForThisLesson: boolean,
    isTeacherBooked: boolean | undefined,
    isOneOfSubgroupsBooked: boolean,
    isNotEnoughSittingPlaces: boolean,
    cabinetBookedBySomeone: boolean,
    cabinetBookedByOneOfFilterSubgroups: boolean
  ) {
    if (isTeacherBookedForThisLesson || cabinetBookedByOneOfFilterSubgroups) {
      return 'primary';
    }
    if (cabinetBookedBySomeone) {
      return 'warn';
    }

    if (isTeacherBooked || isOneOfSubgroupsBooked) {
      return 'grey';
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
