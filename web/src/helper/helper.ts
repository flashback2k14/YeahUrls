import { Response } from "@angular/http";
import { StorageKeys, User } from "../models/index";

export class Helper {
  public static getUserId (): string {
    const userObj = JSON.parse(localStorage.getItem(StorageKeys.USERINFO)) as User;
    if (userObj) {
      return userObj.id;
    }
    return "-1";
  }

  public static getUsername(): string {
    const userObj = JSON.parse(localStorage.getItem(StorageKeys.USERINFO)) as User;
    if (userObj) {
      return userObj.name;
    }
    return "Unknown User";
  }

  public static extractBackendError (error: Response | any): string {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || {};
      errMsg = `${body.error || ""} ${body.error_description || ""} ${body.message || ""}`;
    } else {
      errMsg = error.message || error.toString();
    }
    return (errMsg.trim() === "" ? "Unknown Error!" : errMsg);
  }
}
