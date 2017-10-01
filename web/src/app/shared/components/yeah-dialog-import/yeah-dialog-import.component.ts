import { Component, Input } from '@angular/core';

@Component({
  selector: 'yeah-dialog-import',
  templateUrl: './yeah-dialog-import.component.html',
  styleUrls: ['./yeah-dialog-import.component.css']
})
export class YeahDialogImportComponent {

  @Input() showDialog: boolean;

  constructor () {
    this.showDialog = false;
  }

  test (ta: HTMLTextAreaElement): void {
    const data = JSON.parse(ta.value);
  }
}
