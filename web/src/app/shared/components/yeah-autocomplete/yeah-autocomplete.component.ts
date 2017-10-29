import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tag } from "../../../../models/index";
import {  } from "events";

@Component({
  selector: "yeah-autocomplete",
  templateUrl: "./yeah-autocomplete.component.html",
  styleUrls: ["./yeah-autocomplete.component.css"]
})
export class YeahAutocompleteComponent {

  @Input() placeholderText: string;
  @Input() tagList: Array<Tag>;
  @Input() shouldClearSearchTextAfterSubmitRequest: boolean;
  @Output() addSearchedTagRequestSubmitted: EventEmitter<Tag>;
  filteredTagList: Array<Tag>;

  constructor () {
    this.placeholderText = "Search keyword or create a new one...";
    this.tagList = new Array<Tag>();
    this.shouldClearSearchTextAfterSubmitRequest = true;
    this.addSearchedTagRequestSubmitted = new EventEmitter<Tag>();
    this.filteredTagList = new Array<Tag>();
  }

  filterTagList (txtKeywords: HTMLInputElement): void {
    const searchQuery = txtKeywords.value;

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

  handleNewCreatedTag (event: KeyboardEvent, txtKeywords: HTMLInputElement): void {
    if (event.keyCode === 13 && txtKeywords.value !== "") {
      const notFoundTag = new Tag();
      notFoundTag.name = txtKeywords.value;
      this.addSearchedTagRequestSubmitted.emit(notFoundTag);
      txtKeywords.value = "";
    }
  }

  handleSelectedTagOnEnter (event: KeyboardEvent, tag: Tag, txtKeywords: HTMLInputElement): void {
    if (event.keyCode === 13) {
      this.handleSelectedTag(tag, txtKeywords);
    }
  }

  handleSelectedTag (tag: Tag, txtKeywords: HTMLInputElement): void {
    this.addSearchedTagRequestSubmitted.emit(tag);
    this.filteredTagList = new Array<Tag>();
    txtKeywords.value = this.shouldClearSearchTextAfterSubmitRequest ? "" : tag.name;
  }

}
