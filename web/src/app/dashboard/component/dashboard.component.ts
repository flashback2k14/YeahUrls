import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  YeahDialogDeleteComponent, YeahDialogEditComponent,
  YeahDialogAddComponent, YeahUrlListSearchComponent
} from "../../shared/components/index";
import { UrlService, NotifyService, TagService, SocketService } from "../../core/services/index";
import { Helper } from "../../../helper/index";
import { Url, Tag, SocketEvents } from "../../../models/index";
import { VirtualScrollComponent } from "angular2-virtual-scroll";

@Component({
  selector: "yeah-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild("yeahUrlSearchElement") yeahUrlSearchElement: YeahUrlListSearchComponent;
  @ViewChild("urlVirtualScroll") virtualScroll: VirtualScrollComponent;
  @ViewChild("yeahUrlEditDialog") yeahUrlEditDialog: YeahDialogEditComponent;
  @ViewChild("yeahUrlDeleteDialog") yeahUrlDeleteDialog: YeahDialogDeleteComponent;
  @ViewChild("yeahUrlAddDialog") yeahUrlAddDialog: YeahDialogAddComponent;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  scrollUrlItems: Array<Url>;
  urlChildHeight: number;

  tagList: Array<Tag>;

  showLoading: boolean;
  showNoData: boolean;

  constructor (
    private _urlService: UrlService,
    private _socketService: SocketService,
    private _tagService: TagService,
    private _notifyService: NotifyService
  ) {
    this._urlList = new Array<Url>();
    this.filteredUrlList = new Array<Url>();
    this.scrollUrlItems = new Array<Url>();
    this.tagList = new Array<Tag>();
    this.showLoading = true;
    this.showNoData = true;
  }

  async ngOnInit () {
    try {
      const unsortedUrls = await this._urlService.getUrlsByUser(Helper.getUserId());
      const unsortedTags = await this._tagService.getTags();
      const tagUsage = this._countTagUsage(unsortedUrls, unsortedTags);
      const unsortedPatchedTags = this._patchTags(unsortedTags, tagUsage);

      this._urlList = [...unsortedUrls.sort(this._compareUrls)];
      this.tagList = [...unsortedPatchedTags.sort(this._compareTags)];
      this.filteredUrlList = [...this._urlList];

      this._initSocketListener();

      this.urlChildHeight = this._determineUrlChildHeight();
      this.showLoading = false;
      this.showNoData = this._urlList.length <= 0;

    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _countTagUsage (urls: Array<Url>, tags: Array<Tag>): Array<any> {
    const result = new Array<any>();

    tags.forEach((tag: Tag) => {
      let found = 0;
      urls.forEach((url: Url) => {
        url.tags.forEach((urlTag: Tag) => {
          if (urlTag.id === tag.id) {
            found++;
          }
        });
      });
      result.push({ id: tag.id, count: found });
    });

    return result;
  }

  private _patchTags(unsortedTags: Tag[], tagUsage: any[]): Array<any> {
    const result = unsortedTags.map((tag: Tag) => {
      return {
        ...tag,
        count: tagUsage.find((obj: any) => obj.id === tag.id).count
      };
    });
    return result;
  }

  ngOnDestroy (): void {
    this._removeSocketListener();
  }

  // region socket.io

  private _initSocketListener (): void {
    this._socketService.getSocket().on(SocketEvents.URLADDED, (addedUrl: Url) => {
      const tmpList = [addedUrl, ...this._urlList];
      this._urlList = tmpList;
      this.filteredUrlList = tmpList;
    });
    this._socketService.getSocket().on(SocketEvents.URLUPDATED, (modifiedUrl: Url) => {
      const foundIndex = this._urlList.findIndex((url: Url) => url.id === modifiedUrl.id);
      this._urlList.splice(foundIndex, 1, modifiedUrl);
      this.filteredUrlList = [...this._urlList];
    });
    this._socketService.getSocket().on(SocketEvents.URLDELETED, (removedUrl: any) => {
      const tmpList = this._urlList.filter((url: Url) => url.id !== removedUrl.urlId);
      this._urlList = tmpList;
      this.filteredUrlList = tmpList;
    });

    this._socketService.getSocket().on(SocketEvents.TAGADDED, (addedTag: Tag) => {
      const tmpList = [...this.tagList, addedTag];
      const tagUsage = this._countTagUsage(this._urlList, tmpList);
      const unsortedPatchedTags = this._patchTags(tmpList, tagUsage);
      this.tagList = [...unsortedPatchedTags.sort(this._compareTags)];
    });
    this._socketService.getSocket().on(SocketEvents.TAGUPDATED, (modifiedTag: Tag) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === modifiedTag.id);
      this.tagList.splice(foundIndex, 1, modifiedTag);
    });
    this._socketService.getSocket().on(SocketEvents.TAGDELETED, (removedTag: any) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === removedTag.urlId);
      this.tagList.splice(foundIndex, 1);
    });
  }

  private _removeSocketListener (): void {
    this._socketService.getSocket().off(SocketEvents.URLADDED);
    this._socketService.getSocket().off(SocketEvents.URLUPDATED);
    this._socketService.getSocket().off(SocketEvents.URLDELETED);
    this._socketService.getSocket().off(SocketEvents.TAGADDED);
    this._socketService.getSocket().off(SocketEvents.TAGUPDATED);
    this._socketService.getSocket().off(SocketEvents.TAGDELETED);
  }

  // endregion


  // region yeah-url-list-search

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.urlChildHeight = this._determineUrlChildHeight();
      this.filteredUrlList = [...this._urlList];
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
    if (this.filteredUrlList.length <= 5) {
      this.urlChildHeight = 0;
    }
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
    this.yeahUrlSearchElement.setSearchInputTextAndFireSearchRequest(requestedSearchTerm);
  }

  // endregion

  // region helper

  private _compareUrls (a: Url, b: Url): number {
    return a.updated > b.updated ? -1 : a.updated < b.updated ? 1 : 0;
  }

  private _compareTags (a: Tag, b: Tag): number {
    return a.name.toUpperCase().localeCompare(b.name.toLocaleUpperCase());
  }

  private _determineUrlChildHeight (): number {
    const smallScreen = "(min-device-width : 320px) and (max-device-width : 480px)";
    const mediumScreen = "(min-device-width : 481px) and (max-device-width : 1024px)";

    if (window.matchMedia(smallScreen).matches) { return 100; }
    if (window.matchMedia(mediumScreen).matches) { return 85; }
    return 70;
  }

  urlItemTracker (index, url: Url) {
    return url ? url.id : undefined;
  }

  // endregion
}
