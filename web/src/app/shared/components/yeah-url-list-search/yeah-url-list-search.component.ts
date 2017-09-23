import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'yeah-url-list-search',
  templateUrl: './yeah-url-list-search.component.html',
  styleUrls: ['./yeah-url-list-search.component.css']
})
export class YeahUrlListSearchComponent {

  @Output() searchRequestSubmitted: EventEmitter<string>;

  constructor () { 
    this.searchRequestSubmitted = new EventEmitter<string>();
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
}
