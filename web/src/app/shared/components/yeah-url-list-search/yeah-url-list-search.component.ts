import { Component, Output, EventEmitter, ViewChild, Input, ElementRef } from "@angular/core";
import { YeahAutocompleteComponent } from "../yeah-autocomplete/yeah-autocomplete.component";
import { Tag } from "../../../../models/index";

@Component({
  selector: "yeah-url-list-search",
  templateUrl: "./yeah-url-list-search.component.html",
  styleUrls: ["./yeah-url-list-search.component.css"]
})
export class YeahUrlListSearchComponent {

  @ViewChild("txtSearchTerm") txtSearchTerm: ElementRef;
  @ViewChild("yeahAutocomplete") yeahAutocomplete: YeahAutocompleteComponent;

  @Input() tagList: Array<Tag>;
  @Output() searchRequestSubmitted: EventEmitter<string>;
  @Output() addRequestSubmitted: EventEmitter<void>;

  showTextInput: boolean;
  showKeywordInput: boolean;

  constructor () {
    this.tagList = new Array<Tag>();
    this.searchRequestSubmitted = new EventEmitter<string>();
    this.addRequestSubmitted = new EventEmitter<void>();
    this.showTextInput = true;
    this.showKeywordInput = false;
  }

  sendSearchRequest (): void {
    if (this.showTextInput) {
      if (this.txtSearchTerm && this.txtSearchTerm.nativeElement.value !== "") {
        this.searchRequestSubmitted.next(this.txtSearchTerm.nativeElement.value);
      }
    }
    if (this.showKeywordInput) {
      if (this.yeahAutocomplete.getInputText() !== "") {
        this.searchRequestSubmitted.next(this.yeahAutocomplete.getInputText());
      }
    }
  }

  clearSearchRequest (): void {
    this.searchRequestSubmitted.next(null);

    if (this.txtSearchTerm && this.txtSearchTerm.nativeElement.value) {
      this.txtSearchTerm.nativeElement.value = "";
    }

    if (this.showKeywordInput) {
      this.yeahAutocomplete.clearInputText();
    }
  }

  sendAddRequest (): void {
    this.addRequestSubmitted.emit();
  }

  switchInputRequest (): void {
    this.showTextInput = !this.showTextInput;
    this.showKeywordInput = !this.showKeywordInput;
  }

  setSearchInputTextAndFireSearchRequest (value: string): void {
    if (this.showTextInput) {
      this.txtSearchTerm.nativeElement.value = value;
    }
    if (this.showKeywordInput) {
      this.yeahAutocomplete.setInputText(value);
    }
    this.sendSearchRequest();
  }
}
