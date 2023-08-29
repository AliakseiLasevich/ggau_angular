import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LessonResponseInterface } from './../../interfaces/lesson.interface';

@Component({
  selector: 'app-lesson-info',
  templateUrl: './lesson-info.component.html',
  styleUrls: ['./lesson-info.component.scss'],
})
export class LessonInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<LessonInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: LessonResponseInterface }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
