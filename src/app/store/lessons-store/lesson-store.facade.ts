import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LessonState} from "./lesson.reducer";
import {LessonRequestInterface, LessonResponseInterface} from "../../core/models/lesson.interface";
import {selectIsLoading, selectLessonError, selectLessonForm, selectLessons} from "./lesson.selectors";
import {BackendErrorInterface} from "../../core/models/backendErrors.interface";
import {LessonsFormInterface} from "../../core/models/lessons-form.interfaces";
import {applyFormAction, createLessonAction} from "./lesson.actions";


@Injectable({
  providedIn: 'root',
})
export class LessonStoreFacade {

  constructor(private store: Store<LessonState>) {
  }

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  lessons$: Observable<LessonResponseInterface[]> = this.store.select(selectLessons);
  error$: Observable<BackendErrorInterface | null> = this.store.select(selectLessonError);
  lessonForm$: Observable<LessonsFormInterface | null> = this.store.select(selectLessonForm);


  applyLessonForm(formValue: LessonsFormInterface) {
    this.store.dispatch(applyFormAction({lessonForm: formValue}));
  }

  createLessonAction(lessonRequest: LessonRequestInterface) {
    return this.store.dispatch(createLessonAction({lessonRequest: lessonRequest}));
  }
}
