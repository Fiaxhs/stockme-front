import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import App from './App';
import Home from './pages/Home';
import Image from './pages/Image';
import Album from './pages/Album';
import './css/app.css';

ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="i/:imageIdentifier" component={Image}/>
        <Route path="a/:albumIdentifier" component={Album}/>
        <Route path="a/:albumIdentifier/:imageIdentifier" component={Album}/>
      </Route>
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
);
