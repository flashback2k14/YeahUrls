import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Config } from "../../../../models/index";

@Injectable()
export class ConfigService {

  private _config: Config;

  constructor (private _http: Http) { }

  load (url: string): Promise<void> {
    return new Promise((resolve) => {
      this._http.get(url)
        .map(res => res.json())
        .subscribe(config => {
          this._config = config;
          resolve();
        });
    });
  }

  get config (): Config {
    return this._config;
  }
}
