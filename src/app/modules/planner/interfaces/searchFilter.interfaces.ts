export interface FilterInterface {
  lessonDate: string;
  lessonOrder: number;
  subfilters: Subfilter[];
}

export interface Subfilter {
  subgroupIds: string[];
}
