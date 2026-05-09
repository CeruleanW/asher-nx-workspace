import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/base/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render is deprecated in React 18; cast to any to avoid @types/react-dom overload mismatch
(ReactDOM.render as any)(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
