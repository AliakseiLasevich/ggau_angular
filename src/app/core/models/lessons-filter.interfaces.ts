export interface LessonsFilterInterface {
  fromDate: Date;
  toDate: Date;
  selectedTeacher: string;
  selectedLessonType: string;
  selectedDiscipline: string;
  dynamicGroups: GroupFilterInterface[];
  orderNumber: string;
}

export interface GroupFilterInterface {
  facultyId: string;
  groupId: string;
  specialtyId: string;
  studentCourse: string;
  subgroupIds: string[];
}
