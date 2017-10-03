import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { HeaderService } from '../../core/services/header.service';
import { LoginResult } from '../../../models/login-result';
import { Keys } from '../../../helper/keys';
import { NotifyService } from '../../core/services/notify.service';
import { Helper } from '../../../helper/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (
    private _authService: AuthService,
    private _headerService: HeaderService,
    private _notifyService: NotifyService,
    private _router: Router
  ) { }

  async login (value: any): Promise<void> {
    this._notifyService.onInfo("Logging in...");
    try {
      const result: LoginResult = await this._authService.signIn(value.username, value.password);
      this._setResultToLocalStorage(result);
      this._callHeaderService(result);
      this._router.navigate(["/dashboard"]);
      this._notifyService.onSuccess("Logged in!", true);
    } catch (error) {
      const msg = Helper.extractBackendError(error);
      this._notifyService.onError(msg);
    }
  }

  private _setResultToLocalStorage(result: LoginResult) {
    localStorage.setItem(Keys.USERTOKEN, result.token);
    localStorage.setItem(Keys.USERINFO, JSON.stringify(result.user));
  }

  private _callHeaderService(result: LoginResult) {
    this._headerService.toggleUserArea();
    this._headerService.changeUsername(result.user.name);
  }
}
