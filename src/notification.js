import { notification } from 'antd';

//types: success, info, warning, error
export const notify = (type, msg, description) => {
  notification[type]({
    message: msg,
    description: !!description? description : null
  });
};
