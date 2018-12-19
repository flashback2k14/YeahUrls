import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Url, StorageKeys } from "../../../../models/index";
import { ConfigService } from "./config.service";

@Injectable()
export class UrlService {
  private _baseUrl: string;
  private _headers: HttpHeaders;

  constructor(_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl =
      _configService.config.baseUrl +
      _configService.config.apiVersion +
      _configService.config.urlRoute;
    this._headers = new HttpHeaders()
      .append("accept", "application/json")
      .append("content-type", "application/json");
  }

  getUrlsByUser(userId: string): Promise<Array<Url>> {
    return new Promise((resolve, reject) => {
      this._http
        .get<Array<Url>>(`${this._baseUrl}/${userId}`, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  putUrlByUserAndId(userId: string, urlId: string, urlData: any): Promise<Url> {
    return new Promise((resolve, reject) => {
      this._http
        .put<Url>(`${this._baseUrl}/${userId}/${urlId}`, urlData, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  postUrlByUser(userId: string, urlData: any): Promise<Url> {
    return new Promise((resolve, reject) => {
      this._http
        .post<Url>(`${this._baseUrl}/${userId}`, urlData, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  deleteUrlByUserAndId(userId: string, urlId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._http
        .delete<string>(`${this._baseUrl}/${userId}/${urlId}`, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }
}
