import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import Home from './pages/Home';
import Image from './pages/Image';
import Album from './pages/Album';
import './css/app.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="i/:imageIdentifier" component={Image}/>
      <Route path="a/:albumIdentifier" component={Album}/>
      <Route path="a/:albumIdentifier/:imageIdentifier" component={Album}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
