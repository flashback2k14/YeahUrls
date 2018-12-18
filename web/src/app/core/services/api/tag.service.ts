import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Tag, StorageKeys } from "../../../../models/index";
import { ConfigService } from "./config.service";

@Injectable()
export class TagService {

  private _baseUrl: string;
  private _headers: HttpHeaders;

  constructor (_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl = _configService.config.baseUrl + _configService.config.apiVersion + _configService.config.tagRoute;
    this._headers = new HttpHeaders();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
  }

  // TODO: check method
  getTags (): Promise<Array<Tag>> {
    return new Promise(resolve => {
      this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
      this._http.get<Array<Tag>>(this._baseUrl, { headers: this._headers})
        .subscribe(result => resolve(result));
    });
    // const data: Response = await this._http.get(this._baseUrl, { headers: this._headers}).toPromise();
    // const result = await data.json() as Array<Tag>;
    // return result;
  }
}
