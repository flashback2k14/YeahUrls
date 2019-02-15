import { Component, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../../models";

@Component({
  selector: "yeah-dialog-delete-tag",
  templateUrl: "./yeah-dialog-delete-tag.component.html",
  styleUrls: ["./yeah-dialog-delete-tag.component.css"]
})
export class YeahDialogDeleteTagComponent {
  @Output() deleteTag: EventEmitter<Tag>;
  showDialog: boolean;
  tag: Tag;

  constructor() {
    this.deleteTag = new EventEmitter<Tag>();
    this.showDialog = false;
    this.tag = new Tag();
  }

  open(tag: Tag): void {
    this.tag = { ...tag } as Tag;
    this.showDialog = true;
  }

  cancel(): void {
    this.tag = new Tag();
    this.showDialog = false;
  }

  delete(): void {
    this.deleteTag.emit(this.tag);
    this.showDialog = false;
  }
}
