import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Config, Url, StorageKeys } from "../../../../models/index";

@Injectable()
export class UrlService {

  private _baseUrl: string;
  private _headers: Headers;

  constructor (private _http: Http) {
    this._baseUrl = Config.BASEURL + Config.APIVERSION + Config.URLROUTE;
    this._headers = new Headers();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
  }

  async getUrlsByUser (userId: string): Promise<Array<Url>> {
    this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
    const data: Response = await this._http.get(`${this._baseUrl}/${userId}`,
                                               { headers: this._headers}).toPromise();
    const result = await data.json() as Array<Url>;
    return result;
  }

  async putUrlByUserAndId (userId: string, urlId: string, urlData: any): Promise<Url> {
    this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
    const data: Response = await this._http.put(`${this._baseUrl}/${userId}/${urlId}`, urlData,
                                               { headers: this._headers}).toPromise();
    const result = await data.json() as Url;
    return result;
  }

  async postUrlByUser (userId: string, urlData: any): Promise<Url> {
    this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
    const data: Response = await this._http.post(`${this._baseUrl}/${userId}`, urlData,
                                                { headers: this._headers}).toPromise();
    const result = await data.json() as Url;
    return result;
  }

  async deleteUrlByUserAndId (userId: string, urlId: string): Promise<string> {
    this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
    const data: Response = await this._http.delete(`${this._baseUrl}/${userId}/${urlId}`,
                                                  { headers: this._headers}).toPromise();
    const result = await data.json();
    return result.urlId;
  }
}
