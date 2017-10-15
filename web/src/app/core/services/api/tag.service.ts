import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Config, Tag, StorageKeys } from "../../../../models/index";

@Injectable()
export class TagService {

  private _baseUrl: string;
  private _headers: Headers;

  constructor (private _http: Http) {
    this._baseUrl = Config.BASEURL + Config.APIVERSION + Config.TAGROUTE;
    this._headers = new Headers();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
  }

  async getTags (): Promise<Array<Tag>> {
    this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
    const data: Response = await this._http.get(this._baseUrl, { headers: this._headers}).toPromise();
    const result = await data.json() as Array<Tag>;
    return result;
  }
}
