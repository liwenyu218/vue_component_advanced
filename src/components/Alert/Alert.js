import Notification from "./Notification.js";

let messageInstance;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance();
  return messageInstance;
}

function notice({
  duration = 2.5,
  content = "",
  type = "",
  showClose = false,
}) {
  let instance = getMessageInstance();

  instance.add({
    content,
    duration,
    type,
    showClose,
  });
}

export default {
  info(options) {
    return notice(options);
  },
};
