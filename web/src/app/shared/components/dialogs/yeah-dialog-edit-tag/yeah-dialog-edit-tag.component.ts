import { Component, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../../models";

@Component({
  selector: "yeah-dialog-edit-tag",
  templateUrl: "./yeah-dialog-edit-tag.component.html",
  styleUrls: ["./yeah-dialog-edit-tag.component.css"]
})
export class YeahDialogEditTagComponent {
  @Output() editTag: EventEmitter<Tag>;
  showDialog: boolean;
  oldName: string;
  tag: Tag;

  constructor() {
    this.editTag = new EventEmitter<Tag>();
    this.showDialog = false;
    this.oldName = "";
    this.tag = new Tag();
  }

  open(tag: Tag): void {
    this.tag = { ...tag } as Tag;
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
    this.tag = new Tag();
    this.oldName = "";
    this.showDialog = false;
  }
}
