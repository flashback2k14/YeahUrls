import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  UserService,
  TagService,
  NotifyService,
  UiService,
  UrlService
} from "../../core/services";
import { Helper } from "../../../helper";
import {
  User,
  StorageKeys,
  TagExt,
  TabType,
  TagMoveContainer,
  Url,
  Tag
} from "../../../models";
import { YeahDialogMoveComponent } from "../../shared/components";

@Component({
  selector: "yeah-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {
  @ViewChild("yeahUrlMoveDialog") yeahUrlMoveDialog: YeahDialogMoveComponent;

  urlList: Array<Url>;
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
      await this._load();
    } else {
      this.tagList = null;
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
    if (e.count === 0) {
      this._notifyService.onError(
        "It's not possible to move a Tag with a Count equals Zero.",
        false
      );
      return;
    }

    this.yeahUrlMoveDialog.open(e);
  }

  async handleMoveTag(event: TagMoveContainer): Promise<void> {
    this._notifyService.onInfo("Start Moving Tag...");

    const foundUrlsForSourceTag = this.urlList
      .map((url: Url) => {
        const tagCountForUrl = url.tags.findIndex(
          (tag: Tag) => tag.id === event.sourceTag.id
        );
        return tagCountForUrl > -1 ? url : undefined;
      })
      .filter(Boolean);

    const patchUrls = foundUrlsForSourceTag.map((url: Url) => {
      const tags = url.tags.filter((tag: Tag) => tag.id !== event.sourceTag.id);
      event.destinationTags.forEach((tag: TagExt) => tags.push(tag));
      url.tags = tags;
      return url;
    });

    try {
      const promHolder = patchUrls.map(async (url: Url) => {
        const urlData = {
          url: url.url,
          tags: url.tags.map((tag: Tag) => tag.name)
        };

        await this._urlService.putUrlByUserAndId(
          Helper.getUserId(),
          url.id,
          urlData
        );
      });

      await Promise.all(promHolder);
      await this._load();

      this._notifyService.onSuccess("Successfully moved Tag!");
    } catch (error) {
      this._notifyService.onError(Helper.extractBackendError(error));
    }
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

  private async _load() {
    this.urlList = await this._urlService.getUrlsByUser(Helper.getUserId());
    const unsortedTags = await this._tagService.getTags();
    this.tagList = Helper.getSortedTagListWithUsage(
      this.urlList,
      unsortedTags
    ).sort((a: TagExt, b: TagExt) => a.count - b.count);
  }
}
