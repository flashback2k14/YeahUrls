import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../../../../models/index";

@Injectable()
export class ConfigService {
  private _config: Config;

  constructor(private _http: HttpClient) {}

  load(url: string): Promise<void> {
    return new Promise(resolve => {
      this._http.get<Config>(url).subscribe(config => {
        this._config = config;
        resolve();
      });
    });
  }

  get config(): Config {
    return this._config;
  }
}
