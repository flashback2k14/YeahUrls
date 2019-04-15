import { Injectable } from "@angular/core";
import { UrlService } from "./url.service";
import { Url, LastUpdatedResult, StorageKeys } from "./../../../../models";
import { Helper } from "./../../../../helper";

@Injectable()
export class CachingService {
  private _lastUpdated: Date;
  private _urls: Array<Url>;

  constructor(private _urlService: UrlService) {}

  async fetchUrls(userId: string): Promise<Array<Url>> {
    const lsLastUpdated = localStorage.getItem(StorageKeys.URLS_LAST_UPDATED);
    if (lsLastUpdated) {
      this._lastUpdated = new Date(JSON.parse(lsLastUpdated));
    }

    if (!this._lastUpdated) {
      this._urls = await this._getUrlsForUser(userId);

      const lastUpdatedOnBackend: LastUpdatedResult = await this._urlService.getLastUpdated(userId);
      this._lastUpdated = lastUpdatedOnBackend.lastUpdated;
      localStorage.setItem(StorageKeys.URLS_LAST_UPDATED, JSON.stringify(this._lastUpdated));

      return this._urls;
    }

    const result: LastUpdatedResult = await this._urlService.getLastUpdated(userId);

    if (this._lastUpdated.getTime() < result.lastUpdated.getTime()) {
      this._urls = await this._getUrlsForUser(userId);

      this._lastUpdated = result.lastUpdated;
      localStorage.setItem(StorageKeys.URLS_LAST_UPDATED, JSON.stringify(this._lastUpdated));

      return this._urls;
    }

    const cachedUrls = localStorage.getItem(StorageKeys.URLS_CACHED);
    if (cachedUrls) {
      const urls = JSON.parse(cachedUrls) as Array<Url>;
      this._urls = urls;
    }

    return this._urls;
  }

  private async _getUrlsForUser(userId: string): Promise<Array<Url>> {
    const urls = await this._urlService.getUrlsByUser(userId);
    urls.sort(Helper.compareUrls);
    localStorage.setItem(StorageKeys.URLS_CACHED, JSON.stringify(this._urls));
    return urls;
  }
}
