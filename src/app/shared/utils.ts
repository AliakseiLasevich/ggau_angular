export function areDatesEqual(date1: number[], date2: string): boolean {
  const [year1, month1, day1] = date1;
  const [day2, month2, year2] = date2.split('.').map(Number);

  const jsDate1 = new Date(year1, month1 - 1, day1);
  const jsDate2 = new Date(year2, month2 - 1, day2);

  return jsDate1.getTime() === jsDate2.getTime();
}

export function anyCommonValue(array1: any[], array2: any[]): boolean {
  for (const value of array1) {
    if (array2.includes(value)) {
      return true;
    }
  }
  return false;
}
