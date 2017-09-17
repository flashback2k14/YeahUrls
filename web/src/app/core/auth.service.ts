import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import "rxjs/add/operator/toPromise";
import { Config } from '../../helper/config';
import { LoginResult } from '../../models/login-result';

@Injectable()
export class AuthService {

  private _baseUrl: string;
  private _headers: Headers;

  constructor (private _http: Http) {
    this._baseUrl = Config.BASEURL + Config.APIVERSION;
    this._headers = new Headers();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
  }

  async signIn (username, password): Promise<LoginResult> {
    const url = this._baseUrl + Config.SIGNINROUTE;
    const body = JSON.stringify({ username, password });
    const data: Response = await this._http.post(url, body, { headers: this._headers }).toPromise();
    const result = await data.json();
    return new LoginResult().setToken(result.token).setUser(result.user);
  }
}
