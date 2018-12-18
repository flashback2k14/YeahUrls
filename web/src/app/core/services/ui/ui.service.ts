import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UiService {

  private _changeUsernameAtHeaderAreaSource = new Subject<string>();
  private _toggleHeaderAreaForUserinformationSource = new Subject<void>();
  private _toggleFooterAreaForImportFunctionSource = new Subject<void>();

  public changeUsernameAtHeaderArea$ = this._changeUsernameAtHeaderAreaSource.asObservable();
  public toggleHeaderAreaForUserinformation$ = this._toggleHeaderAreaForUserinformationSource.asObservable();
  public toggleFooterAreaForImportFunction$ = this._toggleFooterAreaForImportFunctionSource.asObservable();

  public changeUsernameAtHeaderArea (username: string): void {
    this._changeUsernameAtHeaderAreaSource.next(username);
  }

  public toggleHeaderAreaForUserinformation (): void {
    this._toggleHeaderAreaForUserinformationSource.next();
  }

  public toggleFooterAreaForImportFunction (): void {
    this._toggleFooterAreaForImportFunctionSource.next();
  }
}
