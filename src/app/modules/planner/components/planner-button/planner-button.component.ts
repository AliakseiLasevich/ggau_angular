import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LessonInfoComponent } from '../lesson-info/lesson-info.component';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';
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
    const dialogRef = this.dialog.open(NewLessonFormComponent);
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
  orderTime: string;
  lesson: LessonResponseInterface | null;
}
