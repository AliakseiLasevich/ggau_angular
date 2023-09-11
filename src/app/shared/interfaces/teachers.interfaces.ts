import { CathedraResponseInterface } from './cathedra.interfaces';

export interface TeacherResponseInterface {
  publicId: string;
  name: string;
  cathedra: CathedraResponseInterface;
  note: string;
}

export interface TeachersResponseInterface {
  teachers: TeacherResponseInterface[];
}
