import React from 'react';
import './style.scss';
import {
  NavLink,
  useHistory
} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { signIn } from './auth';
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


const SignIn = (props) => {

  const fetchMenuFromRear = props.fetchMenuFromRear;
  const history = useHistory();
  let email = '';

  if (!!window.auth.user) {
    email = window.auth.user.username;
  }

  const onFinish = (values) => {
    signIn(values, history, fetchMenuFromRear);
  };

  return (
    <div className='sign-in'>
      <h2>Sign in</h2>
      <div className='container'>
        <Form
          {...layout}
          name="signinForm"
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
            rules={[{ required: true, message: 'Please provide your email address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please provide your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button htmlType="submit">Submit <PlayCircleOutlined /></Button>
          </Form.Item>
        </Form>
        
        <div>To create a new account, you can <NavLink to="/signup">Sign up</NavLink>.</div>
      </div>
    </div>
  );
}

export default SignIn;