import { CabinetResponseInterface } from './cabinet.interfaces';
import { DisciplineResponseInterface } from './disciplines.interfaces';
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
  note: string | null;
}

export interface LessonRequestInterface {
  cabinetId: string;
  date: string;
  lessonType: string;
  disciplineId: string;
  orderNumber: number;
  teacherId: string;
  studentSubgroupIds: string[];
  note: string | null;
}
