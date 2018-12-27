import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TagExt } from "../../../../../models";

@Component({
  selector: "yeah-tag-list-item",
  templateUrl: "./yeah-tag-list-item.html",
  styleUrls: ["./yeah-tag-list-item.css"]
})
export class YeahTagListItemComponent {
  @Input() tag: TagExt;

  @Output() moveItemRequestSubmitted: EventEmitter<TagExt>;
  @Output() editItemRequestSubmitted: EventEmitter<TagExt>;
  @Output() deleteItemRequestSubmitted: EventEmitter<TagExt>;

  constructor() {
    this.moveItemRequestSubmitted = new EventEmitter<TagExt>();
    this.editItemRequestSubmitted = new EventEmitter<TagExt>();
    this.deleteItemRequestSubmitted = new EventEmitter<TagExt>();
  }

  moveItem(): void {
    this.moveItemRequestSubmitted.emit(this.tag);
  }

  editItem(): void {
    this.editItemRequestSubmitted.emit(this.tag);
  }

  deleteItem(): void {
    this.deleteItemRequestSubmitted.emit(this.tag);
  }
}
