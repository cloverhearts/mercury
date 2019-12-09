import {Position, Toaster} from '@blueprintjs/core';

import './index.scss';

const AppToaster = () => {
  return Toaster.create({
    className: 'mercury-notification-normal',
    position: Position.BOTTOM_RIGHT,
    maxToasts: 5,
  });
};

const logToast = AppToaster();

if (window) {
  window.__system_notifications = {
    log: function(msg, timeout = 3000) {
      logToast.show(
        {message: String(msg), timeout, className: 'log-notification'});
    },
    warn: function(msg, timeout = 3000) {
      logToast.
        show({message: String(msg), timeout, className: 'warn-notification'});
    },
    error: function(msg, timeout = 3000) {
      logToast.
        show({message: String(msg), timeout, className: 'error-notification'});
    },

  };
  window._mercury.notification = {
    log: window.__system_notifications.log,
    warn: window.__system_notifications.warn,
    error: window.__system_notifications.error,
  };
}
