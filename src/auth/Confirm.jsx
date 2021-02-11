import React from 'react';
import './style.scss';
import {
  NavLink, 
  useHistory
} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { confirm } from './util';
import {
  PlayCircleOutlined,
} from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Confirm = () => {

  const history = useHistory();
  let email;

  if (!window.auth.unConfirmedUser) {
    history.push('/signin');
    email = '';
  } else {
    email = window.auth.unConfirmedUser.username;
  }

  
  const onFinish = (values) => {
    confirm(values, history);
  };

  return (
    <div className='confirm'>
      <h2>Confirm your email address</h2>
      <p>A confirmation code has been sent, please check your email inbox.</p>
      <div className='container'>
        <Form
          {...layout}
          name="confirmForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size='large'
          initialValues={{
            email: email
          }}
        >
          <Form.Item
            label="Email"
            name="email"
          >
            <Input disabled/>
          </Form.Item>

          <Form.Item
            label="Confirmation code"
            name="code"
            rules={[{ required: true, message: 'Please provide your Confirmation code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit<PlayCircleOutlined /></Button>
          </Form.Item>
        </Form>
        <NavLink to="/signin">Sign in</NavLink>&nbsp;&nbsp;&nbsp;
        <NavLink to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
}

export default Confirm;