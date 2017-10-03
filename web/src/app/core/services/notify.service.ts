import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


export enum NotificationType {
  Success,
  Error,
  Info,
  Warning
}

export class Notification {
  type: NotificationType;
  message: string;

  setType (type: NotificationType): this {
    this.type = type;
    return this;
  }

  setMessage (message: string): this {
    this.message = message;
    return this;
  }
}


@Injectable()
export class NotifyService {

  private _notifySubject = new Subject<Notification>();
  private _keepNotificationAfterRouteChange = false;

  constructor (private _router: Router) {
    _router.events.subscribe(event => {
      if ((event instanceof NavigationStart) &&
          (!this._keepNotificationAfterRouteChange)) {
        this._clearNotifications();
      }
    });
  }

  getNotifications (): Observable<Notification> {
    return this._notifySubject.asObservable();
  }

  onSuccess (message: string, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Success, message, keepNotificationAfterRouteChange);
  }

  onError (message: string, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Error, message, keepNotificationAfterRouteChange);
  }

  onInfo (message: string, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Info, message, keepNotificationAfterRouteChange);
  }

  onWarning (message: string, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Warning, message, keepNotificationAfterRouteChange);
  }

  private _clearNotifications (): void {
    this._notifySubject.next();
  }

  private _notify (type: NotificationType, message: string, keepNotificationAfterRouteChange: boolean = false) {
    this._keepNotificationAfterRouteChange = keepNotificationAfterRouteChange;
    this._notifySubject.next(new Notification().setType(type).setMessage(message));
  }
}
