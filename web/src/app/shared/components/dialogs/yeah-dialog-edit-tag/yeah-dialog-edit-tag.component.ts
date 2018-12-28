import { Component, Output, EventEmitter } from "@angular/core";
import { TagExt } from "../../../../../models";

@Component({
  selector: "yeah-dialog-edit-tag",
  templateUrl: "./yeah-dialog-edit-tag.component.html",
  styleUrls: ["./yeah-dialog-edit-tag.component.css"]
})
export class YeahDialogEditTagComponent {
  @Output() editTag: EventEmitter<TagExt>;
  showDialog: boolean;
  oldName: string;
  tag: TagExt;

  constructor() {
    this.editTag = new EventEmitter<TagExt>();
    this.showDialog = false;
    this.oldName = "";
    this.tag = new TagExt();
  }

  open(tag: TagExt): void {
    this.tag = { ...tag } as TagExt;
    this.oldName = this.tag.name;
    this.showDialog = true;
  }

  cancel(): void {
    this._clearDialog();
  }

  edit(): void {
    this.editTag.emit(this.tag);
    this._clearDialog();
  }

  private _clearDialog() {
    this.tag = new TagExt();
    this.oldName = "";
    this.showDialog = false;
  }
}
