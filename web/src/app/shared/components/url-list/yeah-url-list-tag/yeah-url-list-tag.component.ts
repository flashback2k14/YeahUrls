import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-url-list-tag",
  templateUrl: "./yeah-url-list-tag.component.html",
  styleUrls: ["./yeah-url-list-tag.component.css"]
})
export class YeahUrlListTagComponent {

  @Input() tag: Tag;
  @Output() tagNameAsSearchRequestSubmitted: EventEmitter<string>;

  constructor() {
    this.tagNameAsSearchRequestSubmitted = new EventEmitter<string>();
  }

  tagNameClicked () {
    this.tagNameAsSearchRequestSubmitted.emit(this.tag.name);
  }
}
