import { Component, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { UiService } from "../../core/services/index";

@Component({
  selector: "yeah-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnDestroy {

  @Output() openImportRequestSubmitted: EventEmitter<void>;

  private _toggleFooterAreaForImportFunctionSubscription: Subscription;
  showFooterAreaForImportFunction: boolean;

  constructor (private _uiService: UiService) {
    this.openImportRequestSubmitted = new EventEmitter<void>();
    this.showFooterAreaForImportFunction = false;
    this._toggleFooterAreaForImportFunctionSubscription = this._uiService.toggleFooterAreaForImportFunction$
      .subscribe(() => this.showFooterAreaForImportFunction = !this.showFooterAreaForImportFunction);
  }

  ngOnDestroy (): void {
    this._toggleFooterAreaForImportFunctionSubscription.unsubscribe();
  }

  openImport (): void {
    this.openImportRequestSubmitted.emit();
  }
}
