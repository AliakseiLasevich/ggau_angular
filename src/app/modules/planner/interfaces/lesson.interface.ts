import { CabinetResponseInterface } from './cabinet.interfaces';
import { DisciplineResponseInterface } from './disciplines.interfaces';
import { StudentCourseResponseInterface } from './studentCourse.interfaces';
import { StudentSubgroupResponseInterface } from './studentSubgroup.interfaces';
import { TeacherResponseInterface } from './teachers.interfaces';

export interface LessonResponseInterface {
  publicId: string;
  type: string;
  orderNumber: number;
  date: number[];
  discipline: DisciplineResponseInterface;
  teacher: TeacherResponseInterface;
  cabinet: CabinetResponseInterface;
  studentSubgroups: StudentSubgroupResponseInterface[];
}
