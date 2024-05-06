export enum OrderByOption {
  Title = 'title',
  LastUpdated = 'lastUpdated',
}

export enum OrderOption {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export enum AccessFilterOption {
  Owned = 'owned',
  NotOwned = 'notOwned',
}

export class WhiteBoardQuery {
  title?: string;
  orderBy?: OrderByOption;
  order?: OrderOption;
  workspace?: number;
  accessFilter?: AccessFilterOption;
}
