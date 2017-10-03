import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, UiService, NotifyService } from '../../core/services/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  private _toggleHeaderAreaForUserinformationSubscription: Subscription;
  private _changeUsernameAtHeaderAreaSubscription: Subscription;
  showHeaderAreaForUserinformation: boolean;
  username: string;

  constructor (
    private _authService: AuthService,
    private _uiService: UiService,
    private _notifyService: NotifyService,
    private _router: Router
  ) {
    this.showHeaderAreaForUserinformation = false;
    this.username = "Unknown User";
    this._toggleHeaderAreaForUserinformationSubscription = this._uiService.toggleHeaderAreaForUserinformation$
      .subscribe(() => this.showHeaderAreaForUserinformation = !this.showHeaderAreaForUserinformation);
    this._changeUsernameAtHeaderAreaSubscription = this._uiService.changeUsernameAtHeaderArea$
      .subscribe(username => this.username = username);
  }

  ngOnDestroy(): void {
    this._toggleHeaderAreaForUserinformationSubscription.unsubscribe();
    this._changeUsernameAtHeaderAreaSubscription.unsubscribe();
  }

  async logout (): Promise<void> {
    this._notifyService.onInfo("Logging out...", true, true);
    await this._authService.logout();
    this._uiService.toggleHeaderAreaForUserinformation();
    this._uiService.toggleFooterAreaForImportFunction();
    this._router.navigate(["/login"]);
  }
}
