export enum OrderBy {
  creation = 'createAt',
  name = 'name',
  birthDate = 'birthDate',
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}
export interface Filters {
  name?: string;
  lastName?: string;
  pageNumber?: number;
  pageItems?: number;
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;
}
