export const LessonOrder = {
  1: '8:00 - 9:20',
  2: '9:40 - 11:00',
  3: '11:30 - 12:50',
  4: '13:10 - 14:30',
  5: '14:50 - 16:10',
  6: '16:30 - 17:50',
  7: '18:10 - 19:30',
};

export type LessonOrderKey = keyof typeof LessonOrder;
export type LessonOrderValue = typeof LessonOrder[LessonOrderKey];