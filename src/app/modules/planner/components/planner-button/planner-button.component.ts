import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LessonInfoComponent } from '../lesson-info/lesson-info.component';
import { LessonResponseInterface } from '../../interfaces/lesson.interface';

@Component({
  selector: 'app-planner-button',
  templateUrl: './planner-button.component.html',
  styleUrls: ['./planner-button.component.scss'],
})
export class PlannerButtonComponent implements OnChanges {
  constructor(public dialog: MatDialog) {}
  @Input() dto: PlannerButtonDto;


  viewLessonDetails() {

    const dialogRef = this.dialog.open(LessonInfoComponent, {
      data: { lesson: this.dto.lesson },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  ngOnChanges( changes:SimpleChanges){
  }
}


export interface PlannerButtonDto {
  color: string;
  logo: string;
  description: string;
  orderTime: string;
  lesson: LessonResponseInterface | null;
}
