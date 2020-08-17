import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index.jsx';
import { HashRouter as Router } from "react-router-dom";
import { basename } from './config';

import './index.scss';
import 'antd/dist/antd.css'; 

ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>,
  document.getElementById('root')
);

