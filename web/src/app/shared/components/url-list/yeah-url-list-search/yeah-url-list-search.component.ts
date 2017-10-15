import { Component, Output, EventEmitter, ViewChild } from "@angular/core";

@Component({
  selector: "yeah-url-list-search",
  templateUrl: "./yeah-url-list-search.component.html",
  styleUrls: ["./yeah-url-list-search.component.css"]
})
export class YeahUrlListSearchComponent {

  @ViewChild("txtSearchTerm") txtSearchTerm: any;
  @Output() searchRequestSubmitted: EventEmitter<string>;
  @Output() addRequestSubmitted: EventEmitter<void>;

  constructor () {
    this.searchRequestSubmitted = new EventEmitter<string>();
    this.addRequestSubmitted = new EventEmitter<void>();
  }

  sendSearchRequest (txtSearchTerm: HTMLInputElement): void {
    if (txtSearchTerm.value) {
      this.searchRequestSubmitted.next(txtSearchTerm.value);
    }
  }

  clear (txtSearchTerm: HTMLInputElement): void {
    if (txtSearchTerm.value) {
      this.searchRequestSubmitted.next(null);
      txtSearchTerm.value = "";
    }
  }

  sendAddRequest (): void {
    this.addRequestSubmitted.emit();
  }

  setSearchInputText (value: string): void {
    this.txtSearchTerm.nativeElement.value = value;
    this.sendSearchRequest(this.txtSearchTerm.nativeElement);
  }
}
