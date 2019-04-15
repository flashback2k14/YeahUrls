import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper } from "../../../../helper/index";
import { StorageKeys, LoginResult } from "../../../../models/index";
import { ConfigService } from "./config.service";

@Injectable()
export class AuthService {
  private _isLoggedIn: boolean;
  private _baseUrl: string;
  private _headers: HttpHeaders;

  constructor(
    private _configService: ConfigService,
    private _http: HttpClient
  ) {
    this._baseUrl =
      _configService.config.baseUrl + _configService.config.apiVersion;
    this._headers = new HttpHeaders()
      .append("accept", "application/json")
      .append("content-type", "application/json");
    this._isLoggedIn = false;
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem(StorageKeys.USERTOKEN);
    if (token && !JwtHelper.isTokenExpired(token)) {
      this._isLoggedIn = true;
    }
    return this._isLoggedIn;
  }

  signIn(username: string, password: string): Promise<LoginResult> {
    return new Promise((resolve, reject) => {
      const url = this._baseUrl + this._configService.config.signInRoute;
      const body = { username, password };
      this._http
        .post<LoginResult>(url, body, { headers: this._headers })
        .subscribe(
          result => {
            this._isLoggedIn = true;
            resolve(result);
          },
          error => reject(error)
        );
    });
  }

  logout(): void {
    localStorage.removeItem(StorageKeys.USERTOKEN);
    localStorage.removeItem(StorageKeys.USERINFO);
    localStorage.removeItem(StorageKeys.URLS_LAST_UPDATED);
    localStorage.removeItem(StorageKeys.URLS_CACHED);
    this._isLoggedIn = false;
  }
}
