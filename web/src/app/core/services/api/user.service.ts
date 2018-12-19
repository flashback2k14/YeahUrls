import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ConfigService } from "./config.service";
import { User, StorageKeys } from "../../../../models";

@Injectable()
export class UserService {
  private _baseUrl: string;

  private _headers: HttpHeaders;

  constructor(_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl =
      _configService.config.baseUrl +
      _configService.config.apiVersion +
      _configService.config.userRoute;
    this._headers = new HttpHeaders()
      .append("accept", "application/json")
      .append("content-type", "application/json");
  }

  putNameByUser(userId: string, data: object): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http
        .put<User>(`${this._baseUrl}/${userId}`, data, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }

  putPasswordByUser(userId: string, data: object): Promise<User> {
    return new Promise((resolve, reject) => {
      this._http
        .put<User>(`${this._baseUrl}/${userId}/changepassword`, data, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          )
        })
        .subscribe(result => resolve(result), error => reject(error));
    });
  }
}
