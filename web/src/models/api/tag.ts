export class Tag {
  id: string;
  name: string;
  created: Date;
  updated: Date;
  count: number;

  setName(name: string): this {
    this.name = name;
    return this;
  }
}
