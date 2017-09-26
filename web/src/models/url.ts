import { Tag } from "./tag";

export class Url {
  id: string;
  url: string;
  user: string;
  tags: Array<Tag>;
  created: Date;
  updated: Date;
}
  