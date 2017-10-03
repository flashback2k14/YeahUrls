import { Component, OnInit, ViewChild } from '@angular/core';
import { Helper } from '../../../helper/helper';
import { Url } from '../../../models/url';
import { Tag } from '../../../models/tag';
import { YeahDialogDeleteComponent } from '../../shared/components/yeah-dialog-delete/yeah-dialog-delete.component';
import { YeahDialogEditComponent } from '../../shared/components/yeah-dialog-edit/yeah-dialog-edit.component';
import { YeahUrlListSearchComponent } from '../../shared/components/yeah-url-list-search/yeah-url-list-search.component';
import { UrlService } from '../../core/services/api/url.service';
import { NotifyService } from '../../core/services/ui/notify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("yeahUrlSearchElement") yeahUrlSearchElement: YeahUrlListSearchComponent;
  @ViewChild("yeahUrlEditDialog") yeahUrlEditDialog: YeahDialogEditComponent;
  @ViewChild("yeahUrlDeleteDialog") yeahUrlDeleteDialog: YeahDialogDeleteComponent;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  showLoading: boolean;

  constructor (
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showLoading = true;
  }

  async ngOnInit () {
    try {
      this._urlList = await this._urlService.getUrlsByUser(Helper.getUserId());
      this.filteredUrlList = this._urlList;
      this.showLoading = false;
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = this._urlList;
      return;
    }

    const filteredUrlsByNameList = this._urlList.filter((urlItem: Url) => {
      return urlItem.url.toLowerCase().includes(requestedSearchTerm.toLowerCase());
    });

    let filteredUrlsByTagList = new Array<any>();
    this._urlList.forEach(url => {
      url.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(requestedSearchTerm.toLowerCase())) {
          filteredUrlsByTagList.push(url);
        }
      })
    });

    this.filteredUrlList = Array.from(new Set([...filteredUrlsByNameList, ...filteredUrlsByTagList]));
  }

  handleSubmittedEditUrlItemRequest (requestedUrl: Url): void {
    this.yeahUrlEditDialog.open(requestedUrl);
  }

  handleCompletedEditUrlItem (modifiedUrl: Url): void {
    const foundIndex = this._urlList.findIndex((url: Url) => url.id === modifiedUrl.id);
    this._urlList.splice(foundIndex, 1, modifiedUrl);
    this.filteredUrlList = this._urlList;
  }

  handleSubmittedDeleteUrlItemRequest (requestedUrl: Url): void {
    this.yeahUrlDeleteDialog.open(requestedUrl);
  }

  handleCompletedDeleteUrlItem (removedUrlId: string): void {
    const foundIndex = this._urlList.findIndex((url: Url) => url.id === removedUrlId);
    this._urlList.splice(foundIndex, 1);
    this.filteredUrlList = this._urlList;
  }

  handleSubmittedTagNameAsSearchRequest (requestedSearchTerm: string): void {
    this.yeahUrlSearchElement.setSearchInputText(requestedSearchTerm);
  }
}
