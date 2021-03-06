import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";
import { UrlService, NotifyService } from "../../../../core/services/index";
import { Helper } from "../../../../../helper/index";
import { Url, Tag } from "../../../../../models/index";

@Component({
  selector: "yeah-dialog-add",
  templateUrl: "./yeah-dialog-add.component.html",
  styleUrls: ["./yeah-dialog-add.component.css"]
})
export class YeahDialogAddComponent {
  @ViewChild("taAddInput") taAddInput: ElementRef;

  @Input() showDialog: boolean;
  @Input() tagList: Array<Tag>;
  @Output() addUrlCompleted: EventEmitter<Url>;

  private _url: Url;
  selectedTags: Array<Tag>;

  constructor(
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.addUrlCompleted = new EventEmitter<Url>();
    this.tagList = new Array<Tag>();
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
  }

  // region eventhandler

  handleSubmittedTagNameAsRemoveRequest(event: string): void {
    this.selectedTags = this.selectedTags.filter(
      (tag: Tag) => tag.id !== event
    );
  }

  handleSubmittedNewlyCreatedTagRequest(event: Tag): void {
    this.selectedTags = [...this.selectedTags, event];
  }

  // endregion eventhandler

  // region dialog

  open(url?: Url): void {
    this.showDialog = true;
    this.taAddInput.nativeElement.value = "";
    if (url) {
      this._url = { ...url };
      this.selectedTags = this._url.tags;
      this.taAddInput.nativeElement.value = this._url.url;
    }
  }

  // endregion dialogs

  // region buttons

  cancel(): void {
    this._clearDialog();
  }

  async add(taAddInput: HTMLTextAreaElement): Promise<void> {
    if (!taAddInput.value) {
      return;
    }
    try {
      const urlData = {
        url: taAddInput.value,
        tags: this._getTags()
      };
      const addeddUrl = await this._urlService.postUrlByUser(
        Helper.getUserId(),
        urlData
      );
      this._notifyService.onSuccess("Successfully added Url!");
      this.addUrlCompleted.emit(addeddUrl);
      this._clearDialog();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _getTags(): Array<string> {
    return this.selectedTags.map((tag: Tag) => tag.name);
  }

  private _clearDialog(): void {
    this.taAddInput.nativeElement.value = "";
    this.selectedTags = new Array<Tag>();
    this._url = new Url();
    this.showDialog = false;
  }

  // endregion buttons
}
