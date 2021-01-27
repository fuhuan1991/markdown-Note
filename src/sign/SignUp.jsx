import React  from 'react';
import './style.scss';
import { Form, Input, Button } from 'antd';
import { useHistory, NavLink } from "react-router-dom";
import { signUp } from './auth';
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

const SignUp = () => {

  const history = useHistory();

  const onFinish = (values) => {
    signUp(values, history);
  };

  return (
    <div className='sign-up'>
      <h2>Sign up</h2>
      <div className='container'>
        <Form
          {...layout}
          name="signInForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size='large'
        >
          <Form.Item
            label="Email(user name)"
            name="email"
            rules={[{ required: true, message: 'Please provide your email address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'password should have at least 6 characters' }
          ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[{ required: true, message: 'Please tell me your nickname!' }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Submit <PlayCircleOutlined /></Button>
          </Form.Item>
        </Form>
        
        <div>To use a an exsiting account, you can <NavLink to="/signin">Sign in</NavLink>.</div>
      </div>
    </div>
  );
}

export default SignUp;