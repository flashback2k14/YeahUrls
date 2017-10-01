import { Component, Input } from '@angular/core';
import { UrlService } from '../../../core/services/url.service';
import { Helper } from '../../../../helper/helper';

@Component({
  selector: 'yeah-dialog-import',
  templateUrl: './yeah-dialog-import.component.html',
  styleUrls: ['./yeah-dialog-import.component.css']
})
export class YeahDialogImportComponent {

  @Input() showDialog: boolean;

  constructor (private _urlService: UrlService) {
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
    ta.value = JSON.stringify(parsedUrls);
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
      console.error(error);
    }
  }
}
