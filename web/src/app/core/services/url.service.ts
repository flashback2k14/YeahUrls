import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import "rxjs/add/operator/toPromise";
import { Config } from '../../../helper/config';
import { Keys } from '../../../helper/keys';
import { Url } from '../../../models/url';
import { User } from '../../../models/user';

@Injectable()
export class UrlService {

  private _baseUrl: string;
  private _headers: Headers;

  constructor (private _http: Http) {
    this._baseUrl = Config.BASEURL + Config.APIVERSION + Config.URLROUTE;
    this._headers = new Headers();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
    this._headers.append("X-Access-Token", localStorage.getItem(Keys.USERTOKEN));
  }

  async getUrlsByUser (userId: string): Promise<Array<Url>> {
    const data: Response = await this._http.get(`${this._baseUrl}/${userId}`,
                                               { headers: this._headers}).toPromise();
    const result = await data.json() as Array<Url>;
    return result;
  }

  async putUrlByUserAndId (userId: string, urlId: string, urlData: any): Promise<Url> {
    const data: Response = await this._http.put(`${this._baseUrl}/${userId}`, urlData,
                                                { headers: this._headers}).toPromise();
    const result = await data.json() as Url;
    return result;
  }

  async postUrlByUser (userId: string, urlData: any): Promise<Url> {
    const data: Response = await this._http.post(`${this._baseUrl}/${userId}`, urlData,
                                                { headers: this._headers}).toPromise();
    const result = await data.json() as Url;
    return result;
  }

  async deleteUrlByUserAndId (userId: string, urlId: string): Promise<string> {
    const data: Response = await this._http.delete(`${this._baseUrl}/${userId}/${urlId}`,
                                                  { headers: this._headers}).toPromise();
    const result = await data.json();
    return result.urlId;
  }
}
