import { Injectable } from "@angular/core";
import { UrlService } from "./url.service";
import { Url, LastUpdatedResult } from "./../../../../models";
import { Helper } from "./../../../../helper";

@Injectable()
export class CachingService {
  private _lastUpdated: Date;
  private _urls: Array<Url>;

  constructor(private _urlService: UrlService) {}

  async fetchUrls(userId: string): Promise<Array<Url>> {
    if (!this._lastUpdated) {
      const urls = await this._urlService.getUrlsByUser(userId);
      this._urls = [...urls.sort(Helper.compareUrls)];

      const lastUpdatedOnBackend: LastUpdatedResult = await this._urlService.getLastUpdated(userId);
      this._lastUpdated = lastUpdatedOnBackend.lastUpdated;
      return urls;
    }

    const result: LastUpdatedResult = await this._urlService.getLastUpdated(userId);

    if (this._lastUpdated.getTime() < result.lastUpdated.getTime()) {
      const urls = await this._urlService.getUrlsByUser(userId);
      this._urls = [...urls.sort(Helper.compareUrls)];
      this._lastUpdated = result.lastUpdated;
      return urls;
    }

    return this._urls;
  }
}
