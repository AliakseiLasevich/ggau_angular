import { FacultyResponseInterface } from './faculties.interfaces';

export interface CathedraResponseInterface {
  publicId: string;
  name: string;
  faculty: FacultyResponseInterface;
}
