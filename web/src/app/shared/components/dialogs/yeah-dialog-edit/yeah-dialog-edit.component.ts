import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UrlService, NotifyService } from '../../../../core/services/index';
import { Helper } from '../../../../../helper/index';
import { Url } from '../../../../../models/index';

@Component({
  selector: 'yeah-dialog-edit',
  templateUrl: './yeah-dialog-edit.component.html',
  styleUrls: ['./yeah-dialog-edit.component.css']
})
export class YeahDialogEditComponent {

  @ViewChild("taEditInput") taEditInput: any;
  @Input() showDialog: boolean;
  @Output() editUrlCompleted: EventEmitter<Url>;

  private _url: Url;

  constructor (
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.editUrlCompleted = new EventEmitter<Url>();
  }

  open (url: Url): void {
    this.showDialog = true;
    this._url = url;
    this.taEditInput.nativeElement.value = this._url.url;
  }

  cancel (): void {
    this.showDialog = false;
  }

  async edit (taEditInput: HTMLTextAreaElement): Promise<void> {
    if (!taEditInput.value) return;
    try {
      const urlData = { url: taEditInput.value };
      const modifiedUrl = await this._urlService.putUrlByUserAndId(Helper.getUserId(), this._url.id, urlData);
      this.editUrlCompleted.emit(modifiedUrl);
      this.showDialog = false;
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  } 
}
