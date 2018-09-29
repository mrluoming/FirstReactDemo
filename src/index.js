import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Clock from './Clock'
import MyComponent from './Test.jsx'
import Calculator from './Calculator'
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();


ReactDOM.render(
  <Calculator />,
  document.getElementById('example')
);