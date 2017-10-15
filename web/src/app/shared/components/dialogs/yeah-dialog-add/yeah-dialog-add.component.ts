import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { TagService, UrlService, NotifyService } from "../../../../core/services/index";
import { Helper } from "../../../../../helper/index";
import { Url, Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-dialog-add",
  templateUrl: "./yeah-dialog-add.component.html",
  styleUrls: ["./yeah-dialog-add.component.css"]
})
export class YeahDialogAddComponent implements OnInit {

  @ViewChild("taAddInput") taAddInput: any;
  @ViewChild("txtKeywords") txtKeywords: any;

  @Input() showDialog: boolean;
  @Output() addUrlCompleted: EventEmitter<Url>;

  allTags: Array<Tag>;
  selectedTags: Array<Tag>;
  private _url: Url;

  constructor (
    private _tagService: TagService,
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.addUrlCompleted = new EventEmitter<Url>();
    this.allTags = new Array<Tag>();
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
  }

  // region eventhandler

  async ngOnInit (): Promise<void> {
    try {
      this.allTags = await this._tagService.getTags();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  handleSubmittedTagNameAsRemoveRequest (event): void {
    this.selectedTags = this.selectedTags.filter((tag: Tag) => tag.id !== event);
  }

  handleSelectedTag (event): void {
    const foundTag = this.allTags[event.target.selectedIndex];
    this.selectedTags.push(foundTag);
  }

  // endregion eventhandler

  // region dialog

  open (url?: Url): void {
    this.showDialog = true;
    this.taAddInput.nativeElement.value = "";
    if (url) {
      this._url = url;
      this.selectedTags = this._url.tags;
      this.taAddInput.nativeElement.value = this._url.url;
    }
  }

  // endregion dialogs

  // region buttons

  cancel (): void {
    this._clearDialog();
  }

  async add (taAddInput: HTMLTextAreaElement): Promise<void> {
    if (!taAddInput.value) { return; }
    try {
      const urlData = {
        url: taAddInput.value,
        tags: this._getTags()
      };
      const addeddUrl = await this._urlService.postUrlByUser(Helper.getUserId(), urlData);
      this._notifyService.onSuccess("Successfully added Url!");
      this.addUrlCompleted.emit(addeddUrl);
      this._clearDialog();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _getTags (): Array<string> {
    let result = new Array<string>();
    if (this.txtKeywords.nativeElement.value) {
      const splittedKeywords = this.txtKeywords.nativeElement.value.split(" - ");
      result = splittedKeywords;
    }
    this.selectedTags.forEach((tag: Tag) => {
      result.push(tag.name);
    });
    return result;
  }

  private _clearDialog (): void {
    this.taAddInput.nativeElement.value = "";
    this.txtKeywords.nativeElement.value = "";
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
    this.showDialog = false;
  }

  // endregion buttons
}
