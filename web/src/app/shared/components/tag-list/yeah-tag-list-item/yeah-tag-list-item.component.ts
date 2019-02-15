import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../../models";

@Component({
  selector: "yeah-tag-list-item",
  templateUrl: "./yeah-tag-list-item.component.html",
  styleUrls: ["./yeah-tag-list-item.component.css"]
})
export class YeahTagListItemComponent {
  @Input() tag: Tag;

  @Output() moveItemRequestSubmitted: EventEmitter<Tag>;
  @Output() editItemRequestSubmitted: EventEmitter<Tag>;
  @Output() deleteItemRequestSubmitted: EventEmitter<Tag>;

  constructor() {
    this.moveItemRequestSubmitted = new EventEmitter<Tag>();
    this.editItemRequestSubmitted = new EventEmitter<Tag>();
    this.deleteItemRequestSubmitted = new EventEmitter<Tag>();
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
