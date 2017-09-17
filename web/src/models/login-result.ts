import { User } from "./user";

export class LoginResult {
  private _token: string;
  private  _user: User;

  get token (): string {
    return this._token;
  }

  get user (): User {
    return this._user;
  }

  setToken (token): this {
    this._token = token;
    return this;
  }

  setUser (user): this {
    this._user = user;
    return this;
  }
}
