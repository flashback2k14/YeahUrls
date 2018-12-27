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
import { User, StorageKeys, TagExt, TabType } from "../../../models";

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

  /**
   * TABS
   */

  async handleTabSwitched(e: TabType) {
    if (e === TabType.Tags) {
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

  /**
   * USER
   */

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

  /**
   * TAGS
   */

  handleMoveItemRequestSubmitted(e: TagExt): void {
    console.log(e);
  }

  async handleEditItemRequestSubmitted(e: TagExt): Promise<void> {
    const newTagName = prompt(
      `Please provide a new Name (old Name: ${e.name}).`,
      e.name
    );

    if (newTagName === e.name) {
      return;
    }

    try {
      this._notifyService.onInfo("Change Tag Name...");

      const updatedTag = await this._tagService.putTagById(e.id, {
        name: newTagName
      });

      this.tagList = this.tagList.map((tag: TagExt) =>
        tag.id === updatedTag.id
          ? ({ ...tag, name: updatedTag.name } as TagExt)
          : tag
      );

      this._notifyService.onSuccess("Tag Name successfully changed!");
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }

  async handleDeleteItemRequestSubmitted(e: TagExt): Promise<void> {
    if (e.count > 0) {
      this._notifyService.onError(
        "It's not possible to delete a Tag with a Count greater than Zero. Please move before delete.",
        false
      );
      return;
    }

    if (!confirm(`Are you sure to delete this Tag (${e.name})?`)) {
      return;
    }

    try {
      this._notifyService.onInfo("Delete Tag...");

      const deletedTagId = await this._tagService.deleteTagById(e.id);
      this.tagList = this.tagList.filter(
        (tag: TagExt) => tag.id !== deletedTagId
      );

      this._notifyService.onSuccess("Tag successfully deleted!");
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
  }
}
