export interface LessonsFormInterface {
  fromDate: Date;
  toDate: Date;
  selectedTeacher: string;
  selectedLessonType: string;
  selectedDiscipline: string;
  dynamicGroups: GroupFormInterface[];
  orderNumber: string;
}

export interface GroupFormInterface {
  facultyId: string;
  groupId: string;
  specialtyId: string;
  studentCourse: string;
  subgroupIds: string[];
}
