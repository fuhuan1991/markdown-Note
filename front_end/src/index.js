import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index.jsx';
import { BrowserRouter as Router } from "react-router-dom";

import './index.scss';
import 'antd/dist/antd.css'; 

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

