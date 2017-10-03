import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Keys } from '../../../helper/keys';
import { AuthService } from '../../core/services/api/auth.service';
import { HeaderService } from '../../core/services/ui/header.service';
import { NotifyService } from '../../core/services/ui/notify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {

  private _changeUsernameSubscription: Subscription;
  private _toggleUserAreaSubscription: Subscription;

  username: string;
  showUserArea: boolean;

  constructor (
    private _authService: AuthService,
    private _headerService: HeaderService,
    private _notifyService: NotifyService,
    private _router: Router
  ) {
    this.username = "Unknown User";
    this.showUserArea = false;
    this._changeUsernameSubscription = this._headerService
      .changeUsername$.subscribe(username => this.username = username);
    this._toggleUserAreaSubscription = this._headerService
      .toggleUserArea$.subscribe(() => this.showUserArea = !this.showUserArea);
  }

  ngOnDestroy(): void {
    this._changeUsernameSubscription.unsubscribe();
    this._toggleUserAreaSubscription.unsubscribe();
  }

  async logout (): Promise<void> {
    this._notifyService.onInfo("Logging out...", true, true);
    await this._authService.logout();
    this.username = "Unknown User";
    this.showUserArea = false;
    this._router.navigate(["/login"]);
  }
}
