import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { Observable } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() teachers$: Observable<TeacherResponseInterface[]>;
  @Input() disciplines$: Observable<DisciplineResponseInterface[]>;

  // teachers: string[] = ['Иванов', 'Петров'];

  faculties: string[] = ['Экономический', 'Агрономический'];

  courses: string[] = ['1', '2', '3', '4', '5'];

  groups: { groupNumber: number; subgroups: string[] }[] = [
    { groupNumber: 1, subgroups: ['a', 'b'] },
    { groupNumber: 2, subgroups: ['a', 'b', 'c'] },
  ];

  subgroups = new FormControl('');
  subgroupsList: string[] = ['А', 'Б', 'В'];

  lessons: string[] = ['Экономика', 'Агрохимия', 'Растениеводство'];
  lessonTypes: string[] = ['Лекция', 'Практика', 'Лабораторная'];

  pairOrders: string[] = ['1', '2', '3', '4', '5'];
}
