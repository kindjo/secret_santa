import { NotificationManager, NotificationContainer } from "react-notifications";
import "./Notifications.css";


export const notifyError = (message = "", title = "Error", duration = 3000) => (
  // NotificationsManager method params are:
  // message, title, timeOut, callback, priority (if true, insert on top of the notification stack)
  NotificationManager.error(message, title, duration, undefined, true)
);

export const notifySuccess = (message = "", title = "Success", duration = 3000) => (
  NotificationManager.success(message, title, duration, undefined, true)
);


export const notifyInfo = (message = "", title = "Info", duration = 3000) => (
  NotificationManager.info(message, title, duration, undefined, true)
);

export const notifyWarning = (message = "", title = "Warning", duration = 3000) => (
  NotificationManager.warning(message, title, duration, undefined, true)
);

export { NotificationContainer };
