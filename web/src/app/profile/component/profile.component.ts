import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService, NotifyService, UiService } from "../../core/services";
import { Helper } from "../../../helper";
import { User, StorageKeys } from "../../../models";

@Component({
  selector: "yeah-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {
  constructor(
    private _userService: UserService,
    private _notifyService: NotifyService,
    private _uiService: UiService,
    private _router: Router
  ) {}

  async changeUsername(form: NgForm): Promise<void> {
    this._notifyService.onInfo("Changing username...");
    try {
      const result: User = await this._userService.putNameByUser(
        Helper.getUserId(),
        { name: form.value.newUsername }
      );
      this._handleBackendResult(result, "Username");
      form.resetForm();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  async changeUserpassword(form: NgForm): Promise<void> {
    this._notifyService.onInfo("Changing password...");
    try {
      const result: User = await this._userService.putPasswordByUser(
        Helper.getUserId(),
        form.value
      );
      this._handleBackendResult(result, "Password");
      form.resetForm();
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  private _handleBackendResult(result: User, message: string) {
    localStorage.setItem(StorageKeys.USERINFO, JSON.stringify(result));
    this._uiService.changeUsernameAtHeaderArea(result.name);
    this._notifyService.onSuccess(`${message} successfully changed!`);
  }
}
