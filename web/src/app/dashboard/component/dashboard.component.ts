import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  YeahDialogDeleteComponent, YeahDialogEditComponent,
  YeahDialogAddComponent, YeahUrlListSearchComponent
} from "../../shared/components/index";
import { UrlService, NotifyService, TagService, SocketService } from "../../core/services/index";
import { Helper } from "../../../helper/index";
import { Url, SocketEvents, Tag, TagUsage, TagExt } from "../../../models/index";
import { VirtualScrollComponent } from "angular2-virtual-scroll";

@Component({
  selector: "yeah-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild("urlVirtualScroll") virtualScroll: VirtualScrollComponent;
  @ViewChild("yeahUrlSearchElement") yeahUrlSearchElement: YeahUrlListSearchComponent;
  @ViewChild("yeahUrlEditDialog") yeahUrlEditDialog: YeahDialogEditComponent;
  @ViewChild("yeahUrlDeleteDialog") yeahUrlDeleteDialog: YeahDialogDeleteComponent;
  @ViewChild("yeahUrlAddDialog") yeahUrlAddDialog: YeahDialogAddComponent;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  scrollUrlItems: Array<Url>;
  urlChildHeight: number;

  tagList: Array<TagExt>;

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
    this.tagList = new Array<TagExt>();
    this.showLoading = true;
    this.showNoData = true;
  }

  // TODO: check method
  async ngOnInit () {
    try {
      const unsortedUrls = await this._urlService.getUrlsByUser(Helper.getUserId());
      const unsortedTags = await this._tagService.getTags();

      this._urlList = [...unsortedUrls.sort(this._compareUrls)];
      this.filteredUrlList = [...this._urlList];
      this.tagList = this._getSortedTagListWithUsage(unsortedUrls, unsortedTags);

      this._initSocketListener();

      this.urlChildHeight = this._determineUrlChildHeight();
      this.showLoading = false;
      this.showNoData = this._urlList.length <= 0;

    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  ngOnDestroy (): void {
    this._removeSocketListener();
  }

  // region socket.io

  private _initSocketListener (): void {
    /**
     * URLS
     */
    this._socketService.getSocket().on(SocketEvents.URLADDED, (addedUrl: Url) => {
      const tmpUrlList = [addedUrl, ...this._urlList];
      this._urlList = tmpUrlList;
      this.filteredUrlList = tmpUrlList;
      this.tagList = this._getSortedTagListWithUsage(this._urlList, this.tagList);
    });
    this._socketService.getSocket().on(SocketEvents.URLUPDATED, (modifiedUrl: Url) => {
      const foundIndex = this._urlList.findIndex((url: Url) => url.id === modifiedUrl.id);
      this._urlList.splice(foundIndex, 1, modifiedUrl);
      this.filteredUrlList = [...this._urlList];
      this.tagList = this._getSortedTagListWithUsage(this._urlList, this.tagList);
    });
    this._socketService.getSocket().on(SocketEvents.URLDELETED, (removedUrl: any) => {
      const tmpUrlList = this._urlList.filter((url: Url) => url.id !== removedUrl.urlId);
      this._urlList = tmpUrlList;
      this.filteredUrlList = tmpUrlList;
      this.tagList = this._getSortedTagListWithUsage(this._urlList, this.tagList);
    });
    /**
     * TAGS
     */
    this._socketService.getSocket().on(SocketEvents.TAGADDED, (addedTag: Tag) => {
      const tmpTagList = [...this.tagList, addedTag];
      this.tagList = this._getSortedTagListWithUsage(this._urlList, tmpTagList);
    });
    this._socketService.getSocket().on(SocketEvents.TAGUPDATED, (modifiedTag: Tag) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === modifiedTag.id);
      this.tagList.splice(foundIndex, 1, modifiedTag as TagExt);
      this.tagList = this._getSortedTagListWithUsage(this._urlList, this.tagList);
    });
    this._socketService.getSocket().on(SocketEvents.TAGDELETED, (removedTag: any) => {
      const foundIndex = this.tagList.findIndex((tag: Tag) => tag.id === removedTag.urlId);
      this.tagList.splice(foundIndex, 1);
      this.tagList = this._getSortedTagListWithUsage(this._urlList, this.tagList);
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

  private _calculateTagUsage (urls: Array<Url>, tags: Array<Tag>): Array<TagUsage> {
    const result = new Array<TagUsage>();

    tags.forEach((tag: Tag) => {
      let found = 0;
      urls.forEach((url: Url) => {
        url.tags.forEach((urlTag: Tag) => {
          if (urlTag.id === tag.id) {
            found++;
          }
        });
      });
      result.push(new TagUsage(tag.id, found));
    });

    return result;
  }

  private _extendTags(tags: Array<Tag>, tagUsage: Array<TagUsage>): Array<TagExt> {
    const result = tags.map((tag: Tag) => {
      const count = tagUsage.find((usage: TagUsage) => {
        return usage.referenceId === tag.id;
      }).count;

      const patchedTag = new TagExt();
      patchedTag.id = tag.id;
      patchedTag.name = tag.name;
      patchedTag.created = tag.created;
      patchedTag.updated = tag.updated;
      patchedTag.count = count;

      return patchedTag;
    });
    return result;
  }

  private _getSortedTagListWithUsage (urls: Array<Url>, tags: Array<Tag>): Array<TagExt> {
    const tagUsage = this._calculateTagUsage(urls, tags);
    const unsortedPatchedTags = this._extendTags(tags, tagUsage);
    return [...unsortedPatchedTags.sort(this._compareTags)];
  }

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
