import { CabinetResponseInterface } from "src/app/shared/interfaces/cabinet.interfaces";
import { DisciplineResponseInterface } from "src/app/shared/interfaces/disciplines.interfaces";
import { StudentSubgroupResponseInterface } from "src/app/shared/interfaces/studentSubgroup.interfaces";
import { TeacherResponseInterface } from "src/app/shared/interfaces/teachers.interfaces";


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
