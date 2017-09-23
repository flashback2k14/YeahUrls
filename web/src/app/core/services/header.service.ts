import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HeaderService {

  private _changeUsernameSource = new Subject<string>();
  private _toggleUserAreaSource = new Subject<void>();

  public changeUsername$ = this._changeUsernameSource.asObservable();
  public toggleUserArea$ = this._toggleUserAreaSource.asObservable();

  public changeUsername (username: string): void {
    this._changeUsernameSource.next(username);
  }

  public toggleUserArea (): void {
    this._toggleUserAreaSource.next();
  }
}
