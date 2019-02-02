import { User } from "../api/user";

export class LoginResult {
  private _token: string;
  private _user: User;

  get token(): string {
    return this._token;
  }

  get user(): User {
    return this._user;
  }

  setToken(token: string): this {
    this._token = token;
    return this;
  }

  setUser(user: User): this {
    this._user = user;
    return this;
  }
}
