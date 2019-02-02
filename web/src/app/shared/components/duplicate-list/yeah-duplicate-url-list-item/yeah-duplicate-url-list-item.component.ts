import { Component, Input } from "@angular/core";
import { DuplicateUrlLean } from "./../../../../../models";
import { NotifyService } from "./../../../../core/services";

@Component({
  selector: "yeah-duplicate-url-list-item",
  templateUrl: "./yeah-duplicate-url-list-item.component.html",
  styleUrls: ["./yeah-duplicate-url-list-item.component.css"]
})
export class YeahDuplicateUrlListItemComponent {
  @Input()
  duplicateUrlLean: DuplicateUrlLean;

  constructor(private _notifyService: NotifyService) {}

  copyToClipboard(el: HTMLDivElement): void {
    // focus text
    el.focus();
    // add text to selection range
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
    // copy text
    document.execCommand("copy");
    // remove selection
    selection.removeAllRanges();
    // notify user
    this._notifyService.onInfo("URL copied to search on Dashboard.");
  }
}
