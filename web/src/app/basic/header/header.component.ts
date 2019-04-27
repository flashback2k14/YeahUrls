import { Component, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService, UiService, NotifyService } from "../../core/services";

@Component({
  selector: "yeah-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnDestroy {

  @Output() openImportRequestSubmitted: EventEmitter<void>;
  showHeaderAreaForUserinformation: boolean;
  username: string;

  private _toggleHeaderAreaForUserinformationSubscription: Subscription;
  private _changeUsernameAtHeaderAreaSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _uiService: UiService,
    private _notifyService: NotifyService,
    private _router: Router
  ) {
    this.openImportRequestSubmitted = new EventEmitter<void>();
    this.showHeaderAreaForUserinformation = false;
    this.username = "Unknown User";
    this._toggleHeaderAreaForUserinformationSubscription = this._uiService.toggleHeaderAreaForUserinformation$.subscribe(
      () =>
        (this.showHeaderAreaForUserinformation = !this
          .showHeaderAreaForUserinformation)
    );
    this._changeUsernameAtHeaderAreaSubscription = this._uiService.changeUsernameAtHeaderArea$.subscribe(
      username => (this.username = username)
    );
  }

  ngOnDestroy(): void {
    this._toggleHeaderAreaForUserinformationSubscription.unsubscribe();
    this._changeUsernameAtHeaderAreaSubscription.unsubscribe();
  }

  goToDashboard(): void {
    this._router.navigate(["/dashboard"]);
  }

  goToProfile(): void {
    this._router.navigate(["/profile"]);
  }

  goToFavorites(): void {
    alert("TODO");
  }

  openImport(): void {
    this.openImportRequestSubmitted.emit();
  }

  logout(): void {
    this._notifyService.onInfo("Logging out...", true, true);
    this._authService.logout();
    this._uiService.toggleHeaderAreaForUserinformation();
    this._uiService.toggleFooterAreaForImportFunction();
    this._router.navigate(["/login"]);
  }
}
