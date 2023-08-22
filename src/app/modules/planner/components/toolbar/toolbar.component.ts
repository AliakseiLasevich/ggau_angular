import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DisciplineResponseInterface } from '../../interfaces/disciplines.interfaces';
import { FacultyResponseInterface } from '../../interfaces/faculties.interfaces';
import { SpecialtyResponseInterface } from '../../interfaces/specialty.interfaces';
import { TeacherResponseInterface } from '../../interfaces/teachers.interfaces';
import { getSpecialtiesAction } from '../../store/planner.actions';
import { PlannerState } from '../../store/planner.reducer';
import { selectSpecialties } from '../../store/planner.selectors';
import { LessonTypes } from './../../../../shared/enums/lesson-types.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() teachers$: Observable<TeacherResponseInterface[]>;
  @Input() disciplines$: Observable<DisciplineResponseInterface[]>;
  @Input() faculties$: Observable<FacultyResponseInterface[]>;
  specialties$: Observable<SpecialtyResponseInterface[]>;

  constructor(private store: Store<PlannerState>) {}

  ngOnInit(): void {
    this.specialties$ = this.store.select(selectSpecialties);
  }

  selectedFaculty: string;

  updateFormSpecialties(selectedFaculty: MatSelectChange) {
    this.selectedFaculty = selectedFaculty.value;
    this.store.dispatch(
      getSpecialtiesAction({ publicId: selectedFaculty.value })
    );
  }

  lessonTypes = LessonTypes;

  courses: string[] = ['1', '2', '3', '4', '5'];

  groups: { groupNumber: number; subgroups: string[] }[] = [
    { groupNumber: 1, subgroups: ['a', 'b'] },
    { groupNumber: 2, subgroups: ['a', 'b', 'c'] },
  ];

  subgroups = new FormControl('');
  subgroupsList: string[] = ['А', 'Б', 'В'];

  pairOrders: string[] = ['1', '2', '3', '4', '5'];
}
