import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../core/services/index';
import { Notification, NotificationType } from '../../../../models/index';

@Component({
  selector: 'yeah-notify',
  templateUrl: './yeah-notify.component.html',
  styleUrls: ['./yeah-notify.component.css']
})
export class YeahNotifyComponent implements OnInit {

  notifications: Array<Notification>;

  constructor (private _notifyService: NotifyService) {
    this.notifications = new Array<Notification>();
  }

  ngOnInit () {
    this._notifyService.getNotifications().subscribe((notification: Notification) => {
      if (!notification) {
        this.notifications = new Array<Notification>();
        return;
      }
      this.notifications.push(notification);
      this._removeNotificationAfterDelay(notification);
    });
  }

  getCssClassByType (type: NotificationType): string {
    switch (type) {
      case NotificationType.Success:
        return "notify-container notify-color_success";
      case NotificationType.Info:
        return "notify-container notify-color_info";
      case NotificationType.Error:
        return "notify-container notify-color_error";
      case NotificationType.Warning:
        return "notify-container notify-color_warning";
      default:
        return "";
    }
  }

  removeNotification (notify: Notification): void {
    this.notifications = this.notifications.filter(entry => entry !== notify);
  }

  private _removeNotificationAfterDelay (notfication: Notification): void {
    setTimeout(() => {
      this.notifications.forEach(notification => {
        if (notfication.removeAfterDelay) {
          this.removeNotification(notfication);
        }
      });
    }, 4000);
  }
}
