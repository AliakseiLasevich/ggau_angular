import { StudentSubgroupResponseInterface } from './studentSubgroup.interfaces';

export interface StudentGroupResponseInterface {
  publicId: string;
  number: number;
  studentSubgroups: StudentSubgroupResponseInterface;
}
