import { NotificationType } from "../enums/notification-type";

export class Notification {
  type: NotificationType;
  message: string;
  removeAfterDelay: boolean;

  setType(type: NotificationType): this {
    this.type = type;
    return this;
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setRemoveAfterDelay(removeAfterDelay: boolean): this {
    this.removeAfterDelay = removeAfterDelay;
    return this;
  }
}
