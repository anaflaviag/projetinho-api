export enum OrderBy {
  creation = 'createAt',
  name = 'name',
  birthDate = 'birthDate',
}
export interface Filters {
  name?: string;
  lastName?: string;
  pageNumber?: number;
  pageItems?: number;
  orderBy?: OrderBy;
}
