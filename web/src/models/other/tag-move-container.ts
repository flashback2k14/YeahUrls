import { Tag } from "../api/tag";

export class TagMoveContainer {
  constructor(public sourceTag: Tag, public destinationTags: Array<Tag>) {}
}
