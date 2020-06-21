import { notification } from 'antd';

export const notify = (type, msg, description) => {
  notification[type]({
    message: msg,
    description: !!description? description : null
  });
};
