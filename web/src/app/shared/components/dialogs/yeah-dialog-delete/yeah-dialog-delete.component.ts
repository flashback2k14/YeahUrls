import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UrlService, NotifyService } from "../../../../core/services/index";
import { Helper } from "../../../../../helper/index";
import { Url } from "../../../../../models/index";

@Component({
  selector: "yeah-dialog-delete",
  templateUrl: "./yeah-dialog-delete.component.html",
  styleUrls: ["./yeah-dialog-delete.component.css"]
})
export class YeahDialogDeleteComponent {

  @Input() showDialog: boolean;
  @Output() deleteUrlCompleted: EventEmitter<string>;

  private _url: Url;

  constructor (
    private _urlService: UrlService,
    private _notifyService: NotifyService
  ) {
    this.showDialog = false;
    this.deleteUrlCompleted = new EventEmitter<string>();
  }

  open (url: Url): void {
    this.showDialog = true;
    this._url = url;
  }

  cancel (): void {
    this.showDialog = false;
  }

  async ok (): Promise<void> {
    try {
      const removedUrlId = await this._urlService.deleteUrlByUserAndId(Helper.getUserId(), this._url.id);
      this._notifyService.onSuccess("Successfully deleted Url!");
      this.deleteUrlCompleted.emit(removedUrlId);
      this.showDialog = false;
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }
}
