import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BigBrotherEntry from './containers/BigBrotherEntry'
import * as serviceWorker from './serviceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/semantic-ui-css/semantic.min.css';

ReactDOM.render(<BigBrotherEntry />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
