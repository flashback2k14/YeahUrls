import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Tag } from "../../../../models/index";
import {  } from "events";

@Component({
  selector: "yeah-autocomplete",
  templateUrl: "./yeah-autocomplete.component.html",
  styleUrls: ["./yeah-autocomplete.component.css"]
})
export class YeahAutocompleteComponent {

  @ViewChild("txtKeywords") txtKeywords: ElementRef;

  @Input() placeholderText: string;
  @Input() tagList: Array<Tag>;
  @Input() shouldClearSearchTextAfterSubmitRequest: boolean;
  @Output() newlyCreatedTagRequestSubmitted: EventEmitter<Tag>;

  filteredTagList: Array<Tag>;

  constructor () {
    this.placeholderText = "Search keyword or create a new one...";
    this.tagList = new Array<Tag>();
    this.shouldClearSearchTextAfterSubmitRequest = true;
    this.newlyCreatedTagRequestSubmitted = new EventEmitter<Tag>();
    this.filteredTagList = new Array<Tag>();
  }

  // region input events

  handleFilteringOnKeyUp (): void {
    const searchQuery = this.txtKeywords.nativeElement.value.trim();

    if (searchQuery === "") {
      this.filteredTagList = new Array<Tag>();
      return;
    }

    if (searchQuery === "!") {
      this.filteredTagList = [...this.tagList];
      return;
    }

    this.filteredTagList = this.tagList.filter((tag: Tag) => {
      return tag.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1;
    });
  }

  handleTagCreationOnKeyDown (event: KeyboardEvent): void {
    if (event.keyCode === 13 && this.txtKeywords.nativeElement.value !== "") {
      const newTag = new Tag().setName(this.txtKeywords.nativeElement.value);
      this.newlyCreatedTagRequestSubmitted.emit(newTag);
      this.txtKeywords.nativeElement.value = "";
    }
  }

  clearInputText (): void {
    this.txtKeywords.nativeElement.value = "";
  }

  setInputText (value: string): void {
    this.txtKeywords.nativeElement.value = value;
  }

  getInputText (): string {
    return this.txtKeywords.nativeElement.value;
  }

  // endregion

  // region suggestion list events

  handleSelectedTagOnEnter (event: KeyboardEvent, tag: Tag): void {
    if (event.keyCode === 13) {
      this.handleSelectedTag(tag);
    }
  }

  handleSelectedTag (tag: Tag): void {
    this.newlyCreatedTagRequestSubmitted.emit(tag);
    this.filteredTagList = new Array<Tag>();
    this.txtKeywords.nativeElement.value = this.shouldClearSearchTextAfterSubmitRequest ? "" : tag.name;
  }

  // endregion
}
