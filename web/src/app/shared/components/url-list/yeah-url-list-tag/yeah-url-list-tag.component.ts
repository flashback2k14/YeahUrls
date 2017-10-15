import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-url-list-tag",
  templateUrl: "./yeah-url-list-tag.component.html",
  styleUrls: ["./yeah-url-list-tag.component.css"]
})
export class YeahUrlListTagComponent {

  @Input() tag: Tag;
  @Input() showRemoveButton: boolean;
  @Output() tagNameAsSearchRequestSubmitted: EventEmitter<string>;
  @Output() tagNameAsRemoveRequestSubmitted: EventEmitter<string>;

  constructor() {
    this.tag = new Tag();
    this.showRemoveButton = false;
    this.tagNameAsSearchRequestSubmitted = new EventEmitter<string>();
    this.tagNameAsRemoveRequestSubmitted = new EventEmitter<string>();
  }

  tagNameClicked () {
    this.tagNameAsSearchRequestSubmitted.emit(this.tag.name);
  }

  tagNameClickedForRemoving () {
    this.tagNameAsRemoveRequestSubmitted.emit(this.tag.id);
  }
}
