import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import MyLayout from './layouts/MyLayout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyLayout />, document.getElementById('root'));

registerServiceWorker();