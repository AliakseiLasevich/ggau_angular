import { CabinetResponseInterface } from "src/app/core/models/cabinet.interfaces";
import { DisciplineResponseInterface } from "src/app/core/models/disciplines.interfaces";
import { StudentSubgroupResponseInterface } from "src/app/core/models/studentSubgroup.interfaces";
import { TeacherResponseInterface } from "src/app/core/models/teachers.interfaces";


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
