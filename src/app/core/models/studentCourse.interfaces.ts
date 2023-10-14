import { StudentGroupResponseInterface } from './studentGroup.interfaces';

export interface StudentCourseResponseInterface {
  publicId: string;
  courseNumber: number;
  studentGroups: StudentGroupResponseInterface[];
  specialtyPublicId: string;
}
