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
  removeAfterDelay: boolean;

  setType (type: NotificationType): this {
    this.type = type;
    return this;
  }

  setMessage (message: string): this {
    this.message = message;
    return this;
  }

  setRemoveAfterDelay (removeAfterDelay: boolean): this {
    this.removeAfterDelay = removeAfterDelay;
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

  onSuccess (message: string, removeAfterDelay: boolean = true, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Success, message, removeAfterDelay, keepNotificationAfterRouteChange);
  }

  onError (message: string, removeAfterDelay: boolean = true, keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Error, message, removeAfterDelay, keepNotificationAfterRouteChange);
  }

  onInfo (message: string, removeAfterDelay: boolean = true,keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Info, message, removeAfterDelay, keepNotificationAfterRouteChange);
  }

  onWarning (message: string, removeAfterDelay: boolean = true,keepNotificationAfterRouteChange: boolean = false): void {
    this._notify(NotificationType.Warning, message, removeAfterDelay, keepNotificationAfterRouteChange);
  }

  private _clearNotifications (): void {
    this._notifySubject.next();
  }

  private _notify (type: NotificationType, message: string, removeAfterDelay: boolean = true, keepNotificationAfterRouteChange: boolean = false) {
    this._keepNotificationAfterRouteChange = keepNotificationAfterRouteChange;
    this._notifySubject.next(new Notification().setType(type).setMessage(message).setRemoveAfterDelay(removeAfterDelay));
  }
}
