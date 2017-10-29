import { Component, Output, EventEmitter, ViewChild, Input } from "@angular/core";
import { Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-url-list-search",
  templateUrl: "./yeah-url-list-search.component.html",
  styleUrls: ["./yeah-url-list-search.component.css"]
})
export class YeahUrlListSearchComponent {

  @ViewChild("txtSearchTerm") txtSearchTerm: any;
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

  sendSearchRequest (txtSearchTerm: HTMLInputElement): void {
    if (txtSearchTerm && txtSearchTerm.value) {
      this.searchRequestSubmitted.next(txtSearchTerm.value);
    }
  }

  clear (txtSearchTerm: HTMLInputElement): void {
    if (txtSearchTerm && txtSearchTerm.value) {
      this.searchRequestSubmitted.next(null);
      txtSearchTerm.value = "";
    }
    if (this.showKeywordInput) {
      this.searchRequestSubmitted.next(null);
      this.switchInput();
    }
  }

  sendAddRequest (): void {
    this.addRequestSubmitted.emit();
  }

  switchInput (): void {
    this.showTextInput = !this.showTextInput;
    this.showKeywordInput = !this.showKeywordInput;
  }

  setSearchInputText (value: string): void {
    this.txtSearchTerm.nativeElement.value = value;
    this.sendSearchRequest(this.txtSearchTerm.nativeElement);
  }
}
