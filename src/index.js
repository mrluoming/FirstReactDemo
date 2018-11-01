import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import Clock from './components/Clock';
import MyComponent from './components/Test.jsx';
//import Calculator from './components/Calculator';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();