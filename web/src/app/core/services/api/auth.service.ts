import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { JwtHelper } from "../../../../helper/index";
import { Config, StorageKeys, LoginResult } from "../../../../models/index";

@Injectable()
export class AuthService {

  private _isLoggedIn: boolean;
  private _baseUrl: string;
  private _headers: Headers;

  constructor (private _http: Http) {
    this._baseUrl = Config.BASEURL + Config.APIVERSION;
    this._headers = new Headers();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
    this._isLoggedIn = false;
  }

  get isLoggedIn (): boolean {
    const token = localStorage.getItem(StorageKeys.USERTOKEN);
    if (token && !JwtHelper.isTokenExpired(token)) {
      this._isLoggedIn = true;
    }
    return this._isLoggedIn;
  }

  async signIn (username, password): Promise<LoginResult> {
    const url = this._baseUrl + Config.SIGNINROUTE;
    const body = JSON.stringify({ username, password });
    const data: Response = await this._http.post(url, body, { headers: this._headers }).toPromise();
    const result = await data.json();
    this._isLoggedIn = true;
    return new LoginResult().setToken(result.token).setUser(result.user);
  }

  async logout (): Promise<void> {
    localStorage.removeItem(StorageKeys.USERTOKEN);
    localStorage.removeItem(StorageKeys.USERINFO);
    this._isLoggedIn = false;
  }
}
