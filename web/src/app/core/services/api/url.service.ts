import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  Url,
  PagedUrl,
  StorageKeys,
  DuplicateUrlLean,
  LastUpdatedResult,
} from "../../../../models/index";
import { Helper } from "../../../../helper/index";
import { ConfigService } from "./config.service";

@Injectable()
export class UrlService {
  private _baseUrl: string;
  private _baseV2Url: string;
  private _headers: HttpHeaders;

  constructor(_configService: ConfigService, private _http: HttpClient) {
    this._baseUrl =
      _configService.config.baseUrl +
      _configService.config.apiVersion +
      _configService.config.urlRoute;

    this._baseV2Url =
      _configService.config.baseUrl +
      _configService.config.apiV2Version +
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
          ),
        })
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }

  async getPagedUrlsByUser(userId: string): Promise<Array<Url>> {
    const finalResult = new Array<Url>();
    const limit = Helper.getPagingLimit();
    let page = 1;

    const firstResult = await this._pagedUrlRequest(userId, page, limit);
    finalResult.push(...firstResult.data.urls);

    while (page != firstResult.totalPages) {
      const nextResult = await this._pagedUrlRequest(userId, ++page, limit);
      finalResult.push(...nextResult.data.urls);
    }

    return finalResult;
  }

  private async _pagedUrlRequest(
    userId: string,
    page: number,
    limit: number
  ): Promise<PagedUrl> {
    return await this._http
      .get<PagedUrl>(
        `${this._baseV2Url}/${userId}?page=${page}&limit=${limit}`,
        {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          ),
        }
      )
      .toPromise();
  }

  getDuplicateUrls(userId: string): Promise<Array<DuplicateUrlLean>> {
    return new Promise((resolve, reject) => {
      this._http
        .get<Array<DuplicateUrlLean>>(
          `${this._baseUrl}/duplicates/${userId}?lean=true`,
          {
            headers: this._headers.append(
              "X-Access-Token",
              localStorage.getItem(StorageKeys.USERTOKEN)
            ),
          }
        )
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }

  getLastUpdated(userId: string): Promise<LastUpdatedResult> {
    return new Promise((resolve, reject) => {
      this._http
        .get<LastUpdatedResult>(`${this._baseUrl}/lastupdated/${userId}`, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          ),
        })
        .subscribe(
          (result) =>
            resolve(new LastUpdatedResult(new Date(result.lastUpdated))),
          reject
        );
    });
  }

  putUrlByUserAndId(userId: string, urlId: string, urlData: any): Promise<Url> {
    return new Promise((resolve, reject) => {
      this._http
        .put<Url>(`${this._baseUrl}/${userId}/${urlId}`, urlData, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          ),
        })
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }

  postUrlByUser(userId: string, urlData: any): Promise<Url> {
    return new Promise((resolve, reject) => {
      this._http
        .post<Url>(`${this._baseUrl}/${userId}`, urlData, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          ),
        })
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }

  deleteUrlByUserAndId(userId: string, urlId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._http
        .delete<string>(`${this._baseUrl}/${userId}/${urlId}`, {
          headers: this._headers.append(
            "X-Access-Token",
            localStorage.getItem(StorageKeys.USERTOKEN)
          ),
        })
        .subscribe(
          (result) => resolve(result),
          (error) => reject(error)
        );
    });
  }
}
