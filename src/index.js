import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index.jsx';
import { HashRouter as Router } from "react-router-dom";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import './index.scss';
import 'antd/dist/antd.css'; 

Amplify.configure(awsconfig);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

