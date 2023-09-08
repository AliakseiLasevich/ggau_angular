import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
import { LessonInfoComponent } from '../lesson-info/lesson-info.component';
import { NewLessonFormComponent } from '../new-lesson-form/new-lesson-form.component';

@Component({
  selector: 'app-planner-button',
  templateUrl: './planner-button.component.html',
  styleUrls: ['./planner-button.component.scss'],
})
export class PlannerButtonComponent {
  constructor(public dialog: MatDialog) {}
  @Input() dto: PlannerButtonDto;

  openDialogWindow() {
    if (!this.dto.lesson) {
      this.openNewLessonForm();
    } else {
      this.viewLessonDetails();
    }
  }

  openNewLessonForm() {
    const dialogRef = this.dialog.open(NewLessonFormComponent, {
      data: {
        orderNumber: this.dto.orderNumber,
        orderTime: this.dto.orderTime,
        cabinetId: this.dto.cabinetId,
        date: this.dto.date,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  viewLessonDetails() {
    const dialogRef = this.dialog.open(LessonInfoComponent, {
      data: { lesson: this.dto.lesson },
    });
  }
}

export interface PlannerButtonDto {
  color: string;
  logo: string;
  description: string;
  orderNumber: string;
  orderTime: string;
  lesson: LessonResponseInterface | null;
  cabinetId: string;
  date: string;
}
