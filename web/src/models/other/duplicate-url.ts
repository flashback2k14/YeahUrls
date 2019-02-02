export class DuplicateUrlId {
  URL: string;
}

export class DuplicateUrlLean {
  _id: DuplicateUrlId;
  duplicateUrlIds: Array<string>;
  count: number;
}
