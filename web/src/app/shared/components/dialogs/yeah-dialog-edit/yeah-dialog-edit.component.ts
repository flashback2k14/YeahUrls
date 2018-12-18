import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { UrlService, NotifyService } from "../../../../core/services/index";
import { Helper } from "../../../../../helper/index";
import { Url, Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-dialog-edit",
  templateUrl: "./yeah-dialog-edit.component.html",
  styleUrls: ["./yeah-dialog-edit.component.css"]
})
export class YeahDialogEditComponent {

  @ViewChild("taEditInput") taEditInput: ElementRef;

  @Input() showDialog: boolean;
  @Input() tagList: Array<Tag>;
  @Output() editUrlCompleted: EventEmitter<Url>;

  private _url: Url;
  selectedTags: Array<Tag>;

  constructor (
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.editUrlCompleted = new EventEmitter<Url>();
    this.tagList = new Array<Tag>();
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
  }

  // region eventhandler

  handleSubmittedTagNameAsRemoveRequest (event): void {
    this.selectedTags = this.selectedTags.filter((tag: Tag) => tag.id !== event);
  }

  handleSubmittedNewlyCreatedTagRequest (event): void {
    this.selectedTags = [...this.selectedTags, event];
  }

  // endregion eventhandler

  // region dialog

  open (url: Url): void {
    this.showDialog = true;
    this._url = {...url};
    this.selectedTags = this._url.tags;
    this.taEditInput.nativeElement.value = this._url.url;
  }

  // endregion dialogs

  // region buttons

  cancel (): void {
    this._clearDialog();
  }

  async edit (taEditInput: HTMLTextAreaElement): Promise<void> {
    if (!taEditInput.value) { return; }
    try {
      const urlData = {
        url: taEditInput.value,
        tags: this._getTags()
      };
      const modifiedUrl = await this._urlService.putUrlByUserAndId(Helper.getUserId(), this._url.id, urlData);
      this._notifyService.onSuccess("Successfully modified Url!");
      this.editUrlCompleted.emit(modifiedUrl);
      this._clearDialog();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _getTags (): Array<string> {
    return this.selectedTags.map((tag: Tag) => tag.name);
  }

  private _clearDialog (): void {
    this.taEditInput.nativeElement.value = "";
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
    this.showDialog = false;
  }

  // endregion buttons
}
