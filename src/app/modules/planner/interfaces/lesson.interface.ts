import { CabinetResponseInterface } from './cabinet.interfaces';
import { DisciplineResponseInterface } from './disciplines.interfaces';
import { StudentCourseResponseInterface } from './studentCourse.interfaces';
import { TeacherResponseInterface } from './teachers.interfaces';

export interface LessonResponseInterface {
  publicId: string;
  type: string;
  orderNumber: number;
  date: string;
  discipline: DisciplineResponseInterface;
  teacher: TeacherResponseInterface;
  cabinet: CabinetResponseInterface;
  studentSubgroups: StudentCourseResponseInterface[];
}
