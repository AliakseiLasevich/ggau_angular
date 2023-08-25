export interface PlannerFilterInterface {
  fromDate: Date;
  toDate: Date;
  selectedTeacher: string;
  selectedLessonType: string;
  selectedDiscipline: string;
  dynamicGroups: GroupFilterInterface[]
}

export interface GroupFilterInterface {
  facultyId: string;
  groupId: string;
  specialtyId: string;
  studentCourse: string;
  subgroupIds: string[]
}