import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Url } from "../../../../models";

@Component({
  selector: "yeah-url-list-item",
  templateUrl: "./yeah-url-list-item.component.html",
  styleUrls: ["./yeah-url-list-item.component.css"]
})
export class YeahUrlListItemComponent {
  @Input() url: Url;
  @Input() hideActionButtons: boolean;
  @Output() editUrlItemRequestSubmitted: EventEmitter<any>;
  @Output() deleteUrlItemRequestSubmitted: EventEmitter<any>;

  constructor() {
    this.hideActionButtons = false;
    this.editUrlItemRequestSubmitted = new EventEmitter<any>();
    this.deleteUrlItemRequestSubmitted = new EventEmitter<any>();
  }

  editUrlItem(): void {
    this.editUrlItemRequestSubmitted.emit(this.url);
  }

  deleteUrlItem(): void {
    this.deleteUrlItemRequestSubmitted.emit(this.url);
  }
}
