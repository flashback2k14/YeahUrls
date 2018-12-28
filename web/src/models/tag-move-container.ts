import { TagExt } from "./api/tag-ext";

export class TagMoveContainer {
  constructor(
    public sourceTag: TagExt,
    public destinationTags: Array<TagExt>
  ) {}
}
