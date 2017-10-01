import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Url } from '../../../../models/url';
import { UrlService } from '../../../core/services/url.service';
import { Helper } from '../../../../helper/helper';

@Component({
  selector: 'yeah-dialog-edit',
  templateUrl: './yeah-dialog-edit.component.html',
  styleUrls: ['./yeah-dialog-edit.component.css']
})
export class YeahDialogEditComponent {

  @ViewChild("taEditInput") taEditInput: any;
  @Input() showDialog: boolean;
  @Output() editUrlCompleted: EventEmitter<Url>;

  url: Url;

  constructor (private _urlService: UrlService) {
    this.showDialog = false;
    this.editUrlCompleted = new EventEmitter<Url>();
  }

  open (url: Url): void {
    this.showDialog = true;
    this.url = url;
    this.taEditInput.nativeElement.value = this.url.url;
  }

  cancel (): void {
    this.showDialog = false;
  }

  async edit (taEditInput: HTMLTextAreaElement): Promise<void> {
    if (!taEditInput.value) return;
    const urlData = { url: taEditInput.value };
    const modifiedUrl = await this._urlService.putUrlByUserAndId(Helper.getUserId(), this.url.id, urlData);
    this.editUrlCompleted.emit(modifiedUrl);
    this.showDialog = false;
  } 
}
