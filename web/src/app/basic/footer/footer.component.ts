import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Output() openImportRequestSubmitted: EventEmitter<void>;

  constructor () {
    this.openImportRequestSubmitted = new EventEmitter<void>();
  }

  openImport (): void {
    this.openImportRequestSubmitted.emit();
  }
}
