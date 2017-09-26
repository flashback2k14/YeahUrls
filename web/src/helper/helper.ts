import { Keys } from "./keys";
import { User } from "../models/user";

export class Helper {
  public static getUserId (): string {
    const userObj = JSON.parse(localStorage.getItem(Keys.USERINFO)) as User;
    return userObj.id;
  }
}