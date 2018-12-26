import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  UserService,
  TagService,
  NotifyService,
  UiService,
  UrlService
} from "../../core/services";
import { Helper } from "../../../helper";
import { User, StorageKeys, TagExt } from "../../../models";

@Component({
  selector: "yeah-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {
  tagList: Array<TagExt>;

  constructor(
    private _userService: UserService,
    private _urlService: UrlService,
    private _tagService: TagService,
    private _notifyService: NotifyService,
    private _uiService: UiService
  ) {}

  async handleTabSwitched(e: string) {
    if (e === "tabTags") {
      const unsortedUrls = await this._urlService.getUrlsByUser(
        Helper.getUserId()
      );
      const unsortedTags = await this._tagService.getTags();
      this.tagList = Helper.getSortedTagListWithUsage(
        unsortedUrls,
        unsortedTags
      );
    } else {
      this.tagList = new Array<TagExt>();
    }
  }

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
