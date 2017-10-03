import { Component, Input } from '@angular/core';
import { UrlService, NotifyService } from '../../../../core/services/index';
import { Helper } from '../../../../../helper/index';

@Component({
  selector: 'yeah-dialog-import',
  templateUrl: './yeah-dialog-import.component.html',
  styleUrls: ['./yeah-dialog-import.component.css']
})
export class YeahDialogImportComponent {

  @Input() showDialog: boolean;

  constructor (
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
  }

  clear (ta: HTMLTextAreaElement): void {
    ta.value = "";
  }

  parse (ta: HTMLTextAreaElement): void {
    if (!ta.value) return;

    const urlObjects = JSON.parse(ta.value);

    const parsedUrls = Object.values(urlObjects).map(urlArray => {
      return urlArray.map(url => {
        if (!url) return {};
        return { url: url.value, tags: url.keywords.split(" - ") };
      }).filter(result => Object.keys(result).length > 0);
    });

    ta.value = "";
    ta.value = JSON.stringify(parsedUrls, null, 2);
  }

  async import (ta: HTMLTextAreaElement): Promise<void> {
    if (!ta.value) return;
    try {
      const userId = Helper.getUserId();
      const urlArrays = JSON.parse(ta.value);
      await urlArrays.forEach(async urls => {
        await urls.forEach(async url => {
          await this._urlService.postUrlByUser(userId, url);
        });
      });
      ta.value = "import finished - please reload";
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }
}
