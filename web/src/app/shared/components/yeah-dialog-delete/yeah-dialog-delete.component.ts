import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UrlService } from '../../../core/services/url.service';
import { Helper } from '../../../../helper/helper';
import { Url } from '../../../../models/url';

@Component({
  selector: 'yeah-dialog-delete',
  templateUrl: './yeah-dialog-delete.component.html',
  styleUrls: ['./yeah-dialog-delete.component.css']
})
export class YeahDialogDeleteComponent {

  @Input() showDialog: boolean;
  @Output() deleteUrlCompleted: EventEmitter<string>;

  private _url: Url;

  constructor (private _urlService: UrlService) {
    this.showDialog = false;
    this.deleteUrlCompleted = new EventEmitter<string>();
  }

  open (url: Url): void {
    this.showDialog = true;
    this._url = url;
  }

  cancel (): void {
    this.showDialog = false;
  }

  async ok (): Promise<void> {
    const removedUrlId = await this._urlService.deleteUrlByUserAndId(Helper.getUserId(), this._url.id);
    this.deleteUrlCompleted.emit(removedUrlId);
    this.showDialog = false;
  }
}
