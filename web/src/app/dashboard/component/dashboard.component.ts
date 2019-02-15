import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  YeahDialogDeleteComponent,
  YeahDialogEditComponent,
  YeahDialogAddComponent,
  YeahUrlListSearchComponent
} from "../../shared/components/index";
import {
  UrlService,
  NotifyService,
  TagService,
  SocketService
} from "../../core/services/index";
import { Helper } from "../../../helper/index";
import { Url, SocketEvents, Tag } from "../../../models/index";
import { async } from "@angular/core/testing";

@Component({
  selector: "yeah-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild("yeahUrlSearchElement")
  yeahUrlSearchElement: YeahUrlListSearchComponent;

  @ViewChild("yeahUrlEditDialog")
  yeahUrlEditDialog: YeahDialogEditComponent;

  @ViewChild("yeahUrlDeleteDialog")
  yeahUrlDeleteDialog: YeahDialogDeleteComponent;

  @ViewChild("yeahUrlAddDialog")
  yeahUrlAddDialog: YeahDialogAddComponent;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  scrollUrlItems: Array<Url>;
  tagList: Array<Tag>;

  showLoading: boolean;
  showNoData: boolean;

  constructor(
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

  async ngOnInit() {
    try {
      const unsortedUrls = await this._urlService.getUrlsByUser(
        Helper.getUserId()
      );
      this._urlList = [...unsortedUrls.sort(Helper.compareUrls)];
      this.filteredUrlList = [...this._urlList];

      const unsortedTags = await this._tagService.getTags();
      this.tagList = [...unsortedTags.sort(Helper.compareTags)];

      this._initSocketListener();

      this.showLoading = false;
      this.showNoData = this._urlList.length <= 0;
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  ngOnDestroy(): void {
    this._removeSocketListener();
  }

  // region socket.io

  private _initSocketListener(): void {
    /**
     * URLS
     */
    this._socketService
      .getSocket()
      .on(SocketEvents.URLADDED, async (addedUrl: Url) => {
        const tmpUrlList = [addedUrl, ...this._urlList];
        this._urlList = tmpUrlList;
        this.filteredUrlList = tmpUrlList;

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];
      });
    this._socketService
      .getSocket()
      .on(SocketEvents.URLUPDATED, async (modifiedUrl: Url) => {
        const foundIndex = this._urlList.findIndex(
          (url: Url) => url.id === modifiedUrl.id
        );
        this._urlList.splice(foundIndex, 1, modifiedUrl);
        this.filteredUrlList = [...this._urlList];

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];
      });
    this._socketService
      .getSocket()
      .on(SocketEvents.URLDELETED, async (removedUrl: any) => {
        const tmpUrlList = this._urlList.filter(
          (url: Url) => url.id !== removedUrl.urlId
        );
        this._urlList = tmpUrlList;
        this.filteredUrlList = tmpUrlList;

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];
      });
    /**
     * TAGS
     */
    this._socketService
      .getSocket()
      .on(SocketEvents.TAGADDED, async (addedTag: Tag) => {
        const tmpTagList = [...this.tagList, addedTag];
        this.tagList = [...tmpTagList.sort(Helper.compareTags)];
      });
    this._socketService
      .getSocket()
      .on(SocketEvents.TAGUPDATED, async (modifiedTag: Tag) => {
        const foundIndex = this.tagList.findIndex(
          (tag: Tag) => tag.id === modifiedTag.id
        );
        this.tagList.splice(foundIndex, 1, modifiedTag as Tag);

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];
      });
    this._socketService
      .getSocket()
      .on(SocketEvents.TAGDELETED, async (removedTag: any) => {
        const foundIndex = this.tagList.findIndex(
          (tag: Tag) => tag.id === removedTag.urlId
        );
        this.tagList.splice(foundIndex, 1);

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];
      });
  }

  private _removeSocketListener(): void {
    this._socketService.getSocket().off(SocketEvents.URLADDED);
    this._socketService.getSocket().off(SocketEvents.URLUPDATED);
    this._socketService.getSocket().off(SocketEvents.URLDELETED);
    this._socketService.getSocket().off(SocketEvents.TAGADDED);
    this._socketService.getSocket().off(SocketEvents.TAGUPDATED);
    this._socketService.getSocket().off(SocketEvents.TAGDELETED);
  }

  // endregion

  // region yeah-url-list-search

  handleSubmittedSearchRequest(requestedSearchTerm: string): void {
    if (!requestedSearchTerm) {
      this.filteredUrlList = [...this._urlList];
      return;
    }

    const filteredUrlsByNameList = this._urlList.filter((urlItem: Url) => {
      return urlItem.url
        .toLowerCase()
        .includes(requestedSearchTerm.toLowerCase());
    });

    const filteredUrlsByTagList = new Array<any>();
    this._urlList.forEach(url => {
      url.tags.forEach(tag => {
        if (
          tag.name.toLowerCase().includes(requestedSearchTerm.toLowerCase())
        ) {
          filteredUrlsByTagList.push(url);
        }
      });
    });

    this.filteredUrlList = Array.from(
      new Set([...filteredUrlsByNameList, ...filteredUrlsByTagList])
    );
  }

  handleSubmittedAddRequest(): void {
    this.yeahUrlAddDialog.open();
  }

  // endregion

  // region yeah-url-list-item

  handleSubmittedEditUrlItemRequest(requestedUrl: Url): void {
    this.yeahUrlEditDialog.open(requestedUrl);
  }

  handleSubmittedDeleteUrlItemRequest(requestedUrl: Url): void {
    this.yeahUrlDeleteDialog.open(requestedUrl);
  }

  // endregion

  // region yeah-url-list-tag

  handleSubmittedTagNameAsSearchRequest(requestedSearchTerm: string): void {
    this.yeahUrlSearchElement.setSearchInputTextAndFireSearchRequest(
      requestedSearchTerm
    );
  }

  // endregion

  // region helper

  urlItemTracker(index, url: Url) {
    return url ? url.id : undefined;
  }

  // endregion
}
