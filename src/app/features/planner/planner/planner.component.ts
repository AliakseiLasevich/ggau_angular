import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {LessonResponseInterface} from '../../../core/models/lesson.interface';
import {LessonsFormInterface} from '../../../core/models/lessons-form.interfaces';

import {LessonState} from '../../../store/lessons-store/lesson.reducer';
import {selectFilter, selectLessons,} from '../../../store/lessons-store/lesson.selectors';
import {TeacherResponseInterface} from 'src/app/core/models/teachers.interfaces';
import {DisciplineResponseInterface} from 'src/app/core/models/disciplines.interfaces';
import {FacultyResponseInterface} from 'src/app/core/models/faculties.interfaces';
import {SpecialtyResponseInterface} from 'src/app/core/models/specialty.interfaces';
import {BuildingResponseInterface} from 'src/app/core/models/buildings.interfaces';
import {PlannerStateFacade} from "../../../store/planner-store/planner-state.facade";
import {BackendErrorInterface} from "../../../core/models/backendErrors.interface";

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  isFormValid: boolean;
  teachers$: Observable<TeacherResponseInterface[]> = this.plannerStateFacade.teachers$;
  disciplines$: Observable<DisciplineResponseInterface[]> = this.plannerStateFacade.disciplines$;
  faculties$: Observable<FacultyResponseInterface[]> = this.plannerStateFacade.faculties$;
  specialties$: Observable<SpecialtyResponseInterface[]> = this.plannerStateFacade.specialties$;
  buildings$: Observable<BuildingResponseInterface[]> = this.plannerStateFacade.buildings$;
  error$: Observable<BackendErrorInterface | null> = this.plannerStateFacade.error$;

  lessons$: Observable<LessonResponseInterface[]> = this.store.pipe(select(selectLessons));
  lessonForm$: Observable<LessonsFormInterface | null> = this.store.pipe(select(selectFilter));

  constructor(private plannerStateFacade: PlannerStateFacade,
              private store: Store<LessonState>,
              private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
    this.initializeSubscriptions();
  }

  initializeSubscriptions() {
    this.error$.subscribe((error) => {
      if (error) {
        this._snackBar.open(error.message, 'OK', {duration: 5 * 1000});
      }
    });
  }


  private fetchData() {
    this.plannerStateFacade.fetchTeachers();
    this.plannerStateFacade.fetchDisciplines();
    this.plannerStateFacade.fetchFaculties();
    this.plannerStateFacade.fetchBuildings();
  }

  handleFormValidity(isFormValid: boolean) {
    this.isFormValid = isFormValid;
  }
}
