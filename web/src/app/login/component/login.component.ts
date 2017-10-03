import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Keys } from '../../../helper/keys';
import { Helper } from '../../../helper/helper';
import { LoginResult } from '../../../models/login-result';
import { UiService } from '../../core/services/ui/ui.service';
import { AuthService } from '../../core/services/api/auth.service';
import { NotifyService } from '../../core/services/ui/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (
    private _authService: AuthService,
    private _uiService: UiService,
    private _notifyService: NotifyService,
    private _router: Router
  ) { }

  async login (value: any): Promise<void> {
    this._notifyService.onInfo("Logging in...");
    try {
      const result: LoginResult = await this._authService.signIn(value.username, value.password);
      this._setResultToLocalStorage(result);
      this._uiService.toggleHeaderAreaForUserinformation();
      this._uiService.changeUsernameAtHeaderArea(result.user.name);
      this._uiService.toggleFooterAreaForImportFunction();
      this._router.navigate(["/dashboard"]);
      this._notifyService.onSuccess("Logged in!", true, true);
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _setResultToLocalStorage(result: LoginResult) {
    localStorage.setItem(Keys.USERTOKEN, result.token);
    localStorage.setItem(Keys.USERINFO, JSON.stringify(result.user));
  }
}
