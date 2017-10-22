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
      this._urlList = await this._urlService.getUrlsByUser(Helper.getUserId());
      this.filteredUrlList = this._urlList;
      this.urlChildHeight = this._determineUrlChildHeight();

      const unsortedTags = await this._tagService.getTags();
      this.tagList = unsortedTags.sort((a: Tag, b: Tag) => {
        return a.name.toUpperCase().localeCompare(b.name.toLocaleUpperCase());
      });

      this.showLoading = false;
      this.showNoData = this._urlList.length <= 0;

      this._initSocketListener();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  ngOnDestroy (): void {
    this._removeSocketListener();
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

  // region socket.io

  private _initSocketListener (): void {
    this._socketService.getSocket().on(SocketEvents.URLADDED, (addedUrl: Url) => {
      this._urlList.push(addedUrl);
      this.filteredUrlList = this._urlList;
      this.virtualScroll.scrollInto(this.filteredUrlList[this.filteredUrlList.length - 1]);
    });
    this._socketService.getSocket().on(SocketEvents.URLUPDATED, (modifiedUrl: Url) => {
      const foundIndex = this._urlList.findIndex((url: Url) => url.id === modifiedUrl.id);
      this._urlList.splice(foundIndex, 1, modifiedUrl);
      this.filteredUrlList = this._urlList;
      this.virtualScroll.scrollInto(this.filteredUrlList[foundIndex]);
    });
    this._socketService.getSocket().on(SocketEvents.URLDELETED, (removedUrl: Url) => {
      const foundIndex = this._urlList.findIndex((url: Url) => url.id === removedUrl.id);
      this._urlList.splice(foundIndex, 1);
      this.filteredUrlList = this._urlList;
      this._refreshUrlList();
    });

    this._socketService.getSocket().on(SocketEvents.TAGADDED, (addedTag: Tag) => {
      this.tagList.push(addedTag);
    });
    this._socketService.getSocket().on(SocketEvents.TAGUPDATED, (modifiedTag: Tag) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === modifiedTag.id);
      this.tagList.splice(foundIndex, 1, modifiedTag);
    });
    this._socketService.getSocket().on(SocketEvents.TAGDELETED, (removedTag: Tag) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === removedTag.id);
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

  private _refreshUrlList(): any {
    this.virtualScroll.startupLoop = true;
    this.virtualScroll.refresh();
  }

  // endregion


  // region yeah-url-list-search

  handleSubmittedSearchRequest (requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = this._urlList;
      this.scrollUrlItems = new Array<Url>();
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
}
