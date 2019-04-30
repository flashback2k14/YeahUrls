import { Response } from "@angular/http";
import { StorageKeys, User, Url, Tag } from "../models/index";

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

  public static compareUrls(a: Url, b: Url): number {
    return a.updated > b.updated ? -1 : a.updated < b.updated ? 1 : 0;
  }

  public static compareTags(a: Tag, b: Tag): number {
    return a.name.toUpperCase().localeCompare(b.name.toLocaleUpperCase());
  }

  public static performFiltering(urls: Array<Url>, requestedSearchTerm: string): Array<Url> {
    const filteredUrlsByNameList = urls.filter((urlItem: Url) => {
      return urlItem.url
        .toLowerCase()
        .includes(requestedSearchTerm.toLowerCase());
    });

    const filteredUrlsByTagList = new Array<Url>();
    urls.forEach(url => {
      url.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(requestedSearchTerm.toLowerCase())) {
          filteredUrlsByTagList.push(url);
        }
      });
    });

    return Array.from(new Set([...filteredUrlsByNameList, ...filteredUrlsByTagList]));
  }
}
