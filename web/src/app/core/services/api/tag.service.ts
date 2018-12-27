import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Tag, StorageKeys } from "../../../../models/index";
import { ConfigService } from "./config.service";

@Injectable()
export class TagService {
  private _baseUrl: string;
  private _headers: HttpHeaders;

  constructor(_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl =
      _configService.config.baseUrl +
      _configService.config.apiVersion +
      _configService.config.tagRoute;
    this._headers = new HttpHeaders()
      .append("accept", "application/json")
      .append("content-type", "application/json");
  }

  getTags(): Promise<Array<Tag>> {
    return new Promise((resolve, reject) => {
      this._http
        .get<Array<Tag>>(this._baseUrl, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  putTagById(tagId: string, data: any): Promise<Tag> {
    return new Promise((resolve, reject) => {
      this._http
        .put<Tag>(`${this._baseUrl}/${tagId}`, data, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  deleteTagById(tagId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._http
        .delete<any>(`${this._baseUrl}/${tagId}`, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result.id), error => reject(error));
    });
  }
}
