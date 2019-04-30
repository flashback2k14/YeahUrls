import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "yeah-url-search",
  templateUrl: "./yeah-url-search.component.html",
  styleUrls: ["./yeah-url-search.component.css"]
})
export class YeahUrlSearchComponent {
  @Output() searchRequestSubmitted: EventEmitter<string>;

  constructor() {
    this.searchRequestSubmitted = new EventEmitter<string>();
  }

  sendSearchRequest(event: any): void {
    this.searchRequestSubmitted.next(event.target.value);
  }

  clearSearchRequest(txtSearchInput: HTMLInputElement): void {
    this.searchRequestSubmitted.next(null);
    txtSearchInput.value = "";
  }
}
