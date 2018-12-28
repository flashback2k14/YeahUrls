import { Component, Output, EventEmitter } from "@angular/core";
import { TagExt } from "../../../../../models";

@Component({
  selector: "yeah-dialog-delete-tag",
  templateUrl: "./yeah-dialog-delete-tag.component.html",
  styleUrls: ["./yeah-dialog-delete-tag.component.css"]
})
export class YeahDialogDeleteTagComponent {
  @Output() deleteTag: EventEmitter<TagExt>;
  showDialog: boolean;
  tag: TagExt;

  constructor() {
    this.deleteTag = new EventEmitter<TagExt>();
    this.showDialog = false;
    this.tag = new TagExt();
  }

  open(tag: TagExt): void {
    this.tag = { ...tag } as TagExt;
    this.showDialog = true;
  }

  cancel(): void {
    this.tag = new TagExt();
    this.showDialog = false;
  }

  delete(): void {
    this.deleteTag.emit(this.tag);
    this.showDialog = false;
  }
}
