import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Url, StorageKeys } from "../../../../models/index";
import { ConfigService } from "./config.service";

@Injectable()
export class UrlService {

  private _baseUrl: string;
  private _headers: HttpHeaders;

  constructor (_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl = _configService.config.baseUrl + _configService.config.apiVersion + _configService.config.urlRoute;
    this._headers = new HttpHeaders();
    this._headers.append("accept", "application/json");
    this._headers.append("content-type", "application/json");
  }

  // TODO: check method
  getUrlsByUser (userId: string): Promise<Array<Url>> {
    return new Promise(resolve => {
      this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
      this._http.get<Array<Url>>(`${this._baseUrl}/${userId}`,{ headers: this._headers})
        .subscribe(result => resolve(result));
    });
    // const data: Response = await this._http.get(`${this._baseUrl}/${userId}`,
    //                                            { headers: this._headers}).toPromise();
    // const result = await data.json() as Array<Url>;
    // return result;
  }

  // TODO: check method
  putUrlByUserAndId (userId: string, urlId: string, urlData: any): Promise<Url> {
    return new Promise(resolve => {
      this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
      this._http.put<Url>(`${this._baseUrl}/${userId}/${urlId}`, urlData, { headers: this._headers})
        .subscribe(result => resolve(result));
    });
    // const data: Response = await this._http.put(`${this._baseUrl}/${userId}/${urlId}`, urlData,
    //                                            { headers: this._headers}).toPromise();
    // const result = await data.json() as Url;
    // return result;
  }

  // TODO: check method
  postUrlByUser (userId: string, urlData: any): Promise<Url> {
    return new Promise(resolve => {
      this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
      this._http.post<Url>(`${this._baseUrl}/${userId}`, urlData, { headers: this._headers})
        .subscribe(result => resolve(result));
    });
    // const data: Response = await this._http.post(`${this._baseUrl}/${userId}`, urlData,
    //                                             { headers: this._headers}).toPromise();
    // const result = await data.json() as Url;
    // return result;
  }

  // TODO: check method
  deleteUrlByUserAndId (userId: string, urlId: string): Promise<string> {
    return new Promise(resolve => {
      this._headers.set("X-Access-Token", localStorage.getItem(StorageKeys.USERTOKEN));
      this._http.delete<string>(`${this._baseUrl}/${userId}/${urlId}`, { headers: this._headers})
        .subscribe(result => resolve(result));
    });
    // const data: Response = await this._http.delete(`${this._baseUrl}/${userId}/${urlId}`,
    //                                               { headers: this._headers}).toPromise();
    // const result = await data.json();
    // return result.urlId;
  }
}
