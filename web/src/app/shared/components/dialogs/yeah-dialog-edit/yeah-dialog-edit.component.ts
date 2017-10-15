import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { TagService, UrlService, NotifyService } from "../../../../core/services/index";
import { Helper } from "../../../../../helper/index";
import { Url, Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-dialog-edit",
  templateUrl: "./yeah-dialog-edit.component.html",
  styleUrls: ["./yeah-dialog-edit.component.css"]
})
export class YeahDialogEditComponent implements OnInit {

  @ViewChild("taEditInput") taEditInput: any;
  @Input() showDialog: boolean;
  @Output() editUrlCompleted: EventEmitter<Url>;

  private _allTags: Array<Tag>;
  private _selectedTags: Array<Tag>;
  private _url: Url;

  constructor (
    private _tagService: TagService,
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.editUrlCompleted = new EventEmitter<Url>();
    this._allTags = new Array<Tag>();
    this._selectedTags = new Array<Tag>();
    this._url = new Url();
  }

  // region eventhandler

  async ngOnInit (): Promise<void> {
    try {
      this._allTags = await this._tagService.getTags();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  handleSubmittedTagNameAsRemoveRequest (event): void {
    this._selectedTags = this._selectedTags.filter((tag: Tag) => tag.id !== event);
  }

  handleSelectedTag (event): void {
    const foundTag = this._allTags[event.target.selectedIndex];
    this._selectedTags.push(foundTag);
  }

  // endregion eventhandler

  // region dialog

  open (url: Url): void {
    this.showDialog = true;
    this._url = url;
    this._selectedTags = this._url.tags;
    this.taEditInput.nativeElement.value = this._url.url;
  }

  // endregion dialogs

  // region buttons

  cancel (): void {
    this.showDialog = false;
  }

  async edit (taEditInput: HTMLTextAreaElement): Promise<void> {
    if (!taEditInput.value) { return; }
    try {
      const urlData = {
        url: taEditInput.value,
        tags: this._selectedTags.map((tag: Tag) => tag.id)
      };
      const modifiedUrl = await this._urlService.putUrlByUserAndId(Helper.getUserId(), this._url.id, urlData);
      this._notifyService.onSuccess("Successfully modified Url!");
      this.editUrlCompleted.emit(modifiedUrl);
      this.showDialog = false;
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  // endregion buttons
}
