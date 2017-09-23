import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'yeah-url-list-tag',
  templateUrl: './yeah-url-list-tag.component.html',
  styleUrls: ['./yeah-url-list-tag.component.css']
})
export class YeahUrlListTagComponent{

  @Input() name: string;
  @Output() tagNameAsSearchRequestSubmitted: EventEmitter<string>;

  constructor() {
    this.tagNameAsSearchRequestSubmitted = new EventEmitter<string>();
  }

  tagNameClicked () {
    this.tagNameAsSearchRequestSubmitted.emit(this.name);
  }
}
