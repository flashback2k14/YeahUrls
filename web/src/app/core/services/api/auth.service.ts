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

  constructor (private _configService: ConfigService, private _http: HttpClient) {
    this._baseUrl = _configService.config.baseUrl + _configService.config.apiVersion;
    this._headers = new HttpHeaders();
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

  // TODO: check method
  signIn (username: string, password: string): Promise<LoginResult> {
    // const data: HttpResponse = await this._http.post(url, body, { headers: this._headers });
    // const result = await data.json();
    // this._isLoggedIn = true;
    // return new LoginResult().setToken(result.token).setUser(result.user);

    return new Promise(resolve => {
      const url = this._baseUrl + this._configService.config.signInRoute;
      const body = JSON.stringify({ username, password });
      this._http.post<LoginResult>(url, body, { headers: this._headers })
        .subscribe(result => {
          this._isLoggedIn = true;
          resolve(new LoginResult().setToken(result.token).setUser(result.user));
        });
    });
  }

  logout (): void {
    localStorage.removeItem(StorageKeys.USERTOKEN);
    localStorage.removeItem(StorageKeys.USERINFO);
    this._isLoggedIn = false;
  }
}
