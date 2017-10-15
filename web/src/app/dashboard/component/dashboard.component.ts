import { Component, OnInit, ViewChild } from "@angular/core";
import {
  YeahDialogDeleteComponent, YeahDialogEditComponent, YeahDialogAddComponent, YeahUrlListSearchComponent
} from "../../shared/components/index";
import { UrlService, NotifyService } from "../../core/services/index";
import { Helper } from "../../../helper/index";
import { Url } from "../../../models/index";

@Component({
  selector: "yeah-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  @ViewChild("yeahUrlSearchElement") yeahUrlSearchElement: YeahUrlListSearchComponent;
  @ViewChild("yeahUrlEditDialog") yeahUrlEditDialog: YeahDialogEditComponent;
  @ViewChild("yeahUrlDeleteDialog") yeahUrlDeleteDialog: YeahDialogDeleteComponent;
  @ViewChild("yeahUrlAddDialog") yeahUrlAddDialog: YeahDialogAddComponent;

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

  // region yeah-url-list-search

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = this._urlList;
      return;
    }

    const filteredUrlsByNameList = this._urlList.filter((urlItem: Url) => {
      return urlItem.url.toLowerCase().includes(requestedSearchTerm.toLowerCase());
    });

    const filteredUrlsByTagList = new Array<any>();
    this._urlList.forEach(url => {
      url.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(requestedSearchTerm.toLowerCase())) {
          filteredUrlsByTagList.push(url);
        }
      });
    });

    this.filteredUrlList = Array.from(new Set([...filteredUrlsByNameList, ...filteredUrlsByTagList]));
  }

  handleSubmittedAddRequest (): void {
    this.yeahUrlAddDialog.open();
  }

  // endregion

  // region yeah-url-list-item

  handleSubmittedEditUrlItemRequest (requestedUrl: Url): void {
    this.yeahUrlEditDialog.open(requestedUrl);
  }

  handleSubmittedDeleteUrlItemRequest (requestedUrl: Url): void {
    this.yeahUrlDeleteDialog.open(requestedUrl);
  }

  // endregion

  // region yeah-url-list-tag

  handleSubmittedTagNameAsSearchRequest (requestedSearchTerm: string): void {
    this.yeahUrlSearchElement.setSearchInputText(requestedSearchTerm);
  }

  // endregion

  // region yeah-dialog-edit

  handleCompletedEditUrlItem (modifiedUrl: Url): void {
    const foundIndex = this._urlList.findIndex((url: Url) => url.id === modifiedUrl.id);
    this._urlList.splice(foundIndex, 1, modifiedUrl);
    this.filteredUrlList = this._urlList;
  }

  // endregion

  // region yeah-dialog-delete

  handleCompletedDeleteUrlItem (removedUrlId: string): void {
    const foundIndex = this._urlList.findIndex((url: Url) => url.id === removedUrlId);
    this._urlList.splice(foundIndex, 1);
    this.filteredUrlList = this._urlList;
  }

  // endregion

  // region yeah-dialog-add

  handleCompletedAddUrlItem (addedUrl: Url): void {
    this._urlList.unshift(addedUrl);
    this.filteredUrlList = this._urlList;
  }

  // endregion
}
