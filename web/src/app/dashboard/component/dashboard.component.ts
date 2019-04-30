import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
  YeahDialogDeleteComponent,
  YeahDialogEditComponent,
  YeahDialogAddComponent,
  YeahUrlListSearchComponent
} from "../../shared/components/index";
import {
  CachingService,
  NotifyService,
  TagService,
  SocketService
} from "../../core/services/index";
import { Helper } from "../../../helper/index";
import { Url, SocketEvents, Tag } from "../../../models/index";


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

  private _queryParamsSubscription$: Subscription;

  private _urlList: Array<Url>;
  filteredUrlList: Array<Url>;
  scrollUrlItems: Array<Url>;
  tagList: Array<Tag>;

  showLoading: boolean;
  showNoData: boolean;

  constructor(
    private _cachingService: CachingService,
    private _socketService: SocketService,
    private _tagService: TagService,
    private _notifyService: NotifyService,
    private _route: ActivatedRoute
  ) {
    this._urlList = new Array<Url>();
    this.filteredUrlList = new Array<Url>();
    this.scrollUrlItems = new Array<Url>();
    this.tagList = new Array<Tag>();
    this.showLoading = true;
    this.showNoData = false;
  }

  async ngOnInit() {
    try {
      this._handleShareMenu();

      this._urlList = await this._cachingService.fetchUrls(Helper.getUserId());

      if (this._urlList == null || this._urlList.length <= 0) {
        this.showNoData = true;
        this.showLoading = false;
        return;
      }

      this.filteredUrlList = [...this._urlList];
      this.showLoading = false;

      const unsortedTags = await this._tagService.getTags();
      this.tagList = [...unsortedTags.sort(Helper.compareTags)];

      this._initSocketListener();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  ngOnDestroy(): void {
    this._removeSocketListener();
    this._queryParamsSubscription$.unsubscribe();
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

        await this._cachingService.updateUrls(Helper.getUserId(), this._urlList);

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

        await this._cachingService.updateUrls(Helper.getUserId(), this._urlList);

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];

        this.yeahUrlSearchElement.sendSearchRequest();
      });
    this._socketService
      .getSocket()
      .on(SocketEvents.URLDELETED, async (removedUrl: any) => {
        const tmpUrlList = this._urlList.filter(
          (url: Url) => url.id !== removedUrl.urlId
        );
        this._urlList = tmpUrlList;
        this.filteredUrlList = tmpUrlList;

        await this._cachingService.updateUrls(Helper.getUserId(), this._urlList);

        const unsortedTags = await this._tagService.getTags();
        this.tagList = [...unsortedTags.sort(Helper.compareTags)];

        this.yeahUrlSearchElement.sendSearchRequest();
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
        this.yeahUrlSearchElement.sendSearchRequest();
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

        this.yeahUrlSearchElement.sendSearchRequest();
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

    this.filteredUrlList = Helper.performFiltering(this._urlList, requestedSearchTerm);
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

  private _handleShareMenu() {
    this._queryParamsSubscription$ = this._route.queryParams.subscribe(params => {
      const urlAsText = params["text"];
      if (urlAsText) {
        const urlToOpening = new Url();
        urlToOpening.url = urlAsText;
        urlToOpening.tags = new Array<Tag>();
        this.yeahUrlAddDialog.open(urlToOpening);
      }
    });
  }

  // endregion
}
