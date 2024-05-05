export enum OrderByOption {
  Title = 'title',
  LastUpdated = 'lastUpdated',
}

export enum AccessFilterOption {
  Owned = 'owned',
  NotOwned = 'notOwned',
}

export class WhiteBoardQuery {
  title?: string;
  orderBy?: OrderByOption;
  workspace?: string;
  accessFilter?: AccessFilterOption;
}
