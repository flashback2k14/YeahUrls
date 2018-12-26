import { Response } from "@angular/http";
import { StorageKeys, User, Url, Tag, TagUsage, TagExt } from "../models/index";

export class Helper {
  public static getUserId(): string {
    const userObj = JSON.parse(
      localStorage.getItem(StorageKeys.USERINFO)
    ) as User;
    if (userObj) {
      return userObj.id;
    }
    return "-1";
  }

  public static getUsername(): string {
    const userObj = JSON.parse(
      localStorage.getItem(StorageKeys.USERINFO)
    ) as User;
    if (userObj) {
      return userObj.name;
    }
    return "Unknown User";
  }

  public static extractBackendError(error: Response | any): string {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || {};
      errMsg = `${body.error || ""} ${body.error_description ||
        ""} ${body.message || ""}`;
    } else {
      errMsg = error.message || error.toString();
    }
    return errMsg.trim() === "" ? "Unknown Error!" : errMsg;
  }

  private static _calculateTagUsage(
    urls: Array<Url>,
    tags: Array<Tag>
  ): Array<TagUsage> {
    const result = new Array<TagUsage>();

    tags.forEach((tag: Tag) => {
      let found = 0;
      urls.forEach((url: Url) => {
        url.tags.forEach((urlTag: Tag) => {
          if (urlTag.id === tag.id) {
            found++;
          }
        });
      });
      result.push(new TagUsage(tag.id, found));
    });

    return result;
  }

  private static _extendTags(
    tags: Array<Tag>,
    tagUsage: Array<TagUsage>
  ): Array<TagExt> {
    const result = tags.map((tag: Tag) => {
      const count = tagUsage.find((usage: TagUsage) => {
        return usage.referenceId === tag.id;
      }).count;

      const patchedTag = new TagExt();
      patchedTag.id = tag.id;
      patchedTag.name = tag.name;
      patchedTag.created = tag.created;
      patchedTag.updated = tag.updated;
      patchedTag.count = count;

      return patchedTag;
    });
    return result;
  }

  private static _compareTags(a: Tag, b: Tag): number {
    return a.name.toUpperCase().localeCompare(b.name.toLocaleUpperCase());
  }

  public static getSortedTagListWithUsage(
    urls: Array<Url>,
    tags: Array<Tag>
  ): Array<TagExt> {
    const tagUsage = Helper._calculateTagUsage(urls, tags);
    const unsortedPatchedTags = Helper._extendTags(tags, tagUsage);
    return [...unsortedPatchedTags.sort(Helper._compareTags)];
  }
}
