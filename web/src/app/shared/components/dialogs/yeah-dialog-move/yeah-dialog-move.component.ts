import { Input, Component, Output, EventEmitter } from "@angular/core";
import { TagExt, Tag, TagMoveContainer } from "../../../../../models";

@Component({
  selector: "yeah-dialog-move",
  templateUrl: "./yeah-dialog-move.component.html",
  styleUrls: ["./yeah-dialog-move.component.css"]
})
export class YeahDialogMoveComponent {
  @Input() tagList: Array<TagExt>;
  @Output() moveTag: EventEmitter<TagMoveContainer>;

  tag: TagExt;
  showDialog: boolean;
  selectedTags: Array<TagExt>;

  constructor() {
    this.moveTag = new EventEmitter<TagMoveContainer>();
    this.tag = new TagExt();
    this.showDialog = false;
    this.selectedTags = new Array<TagExt>();
  }

  open(tag: TagExt): void {
    this.tag = tag;
    this.showDialog = true;
  }

  handleSubmittedTagNameAsRemoveRequest(event: string) {
    this.selectedTags = this.selectedTags.filter(
      (tag: TagExt) => tag.id !== event
    );
  }

  handleSubmittedNewlyCreatedTagRequest(event: Tag) {
    this.selectedTags = [...this.selectedTags, event as TagExt];
  }

  cancel() {
    this._clearDialog();
  }

  move() {
    this.moveTag.emit(new TagMoveContainer(this.tag, this.selectedTags));
    this._clearDialog();
  }

  private _clearDialog(): void {
    this.tag = new TagExt();
    this.showDialog = false;
    this.selectedTags = new Array<TagExt>();
  }
}
