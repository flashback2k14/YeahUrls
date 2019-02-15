import { Input, Component, Output, EventEmitter } from "@angular/core";
import { Tag, TagMoveContainer } from "../../../../../models";

@Component({
  selector: "yeah-dialog-move",
  templateUrl: "./yeah-dialog-move.component.html",
  styleUrls: ["./yeah-dialog-move.component.css"]
})
export class YeahDialogMoveComponent {
  @Input() tagList: Array<Tag>;
  @Output() moveTag: EventEmitter<TagMoveContainer>;

  tag: Tag;
  showDialog: boolean;
  selectedTags: Array<Tag>;

  constructor() {
    this.moveTag = new EventEmitter<TagMoveContainer>();
    this.tag = new Tag();
    this.showDialog = false;
    this.selectedTags = new Array<Tag>();
  }

  open(tag: Tag): void {
    this.tag = tag;
    this.showDialog = true;
  }

  handleSubmittedTagNameAsRemoveRequest(event: string) {
    this.selectedTags = this.selectedTags.filter(
      (tag: Tag) => tag.id !== event
    );
  }

  handleSubmittedNewlyCreatedTagRequest(event: Tag) {
    this.selectedTags = [...this.selectedTags, event as Tag];
  }

  cancel() {
    this._clearDialog();
  }

  move() {
    this.moveTag.emit(new TagMoveContainer(this.tag, this.selectedTags));
    this._clearDialog();
  }

  private _clearDialog(): void {
    this.tag = new Tag();
    this.showDialog = false;
    this.selectedTags = new Array<Tag>();
  }
}
