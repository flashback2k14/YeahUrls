import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Helper } from "../../../helper/index";
import { LoginResult, StorageKeys } from "../../../models/index";
import { AuthService, UiService, NotifyService } from "../../core/services/index";

@Component({
  selector: "yeah-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
    private _uiService: UiService,
    private _notifyService: NotifyService,
    private _router: Router
  ) {}

  async loginOnEnter(value: any): Promise<void> {
    await this.login(value);
  }

  async login(value: any): Promise<void> {
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
    localStorage.setItem(StorageKeys.USERTOKEN, result.token);
    localStorage.setItem(StorageKeys.USERINFO, JSON.stringify(result.user));
  }
}
