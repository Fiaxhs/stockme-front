import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import Home from "./pages/Home";
import Image from "./pages/Image";
import Album from "./pages/Album";
import "./css/app.css";

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <div>
        <Route path="/" component={Home} />
        <Route path="i/:imageIdentifier" component={Image} />
        <Route path="a/:albumIdentifier" component={Album} />
        <Route path="a/:albumIdentifier/:imageIdentifier" component={Album} />
      </div>
    </BrowserRouter>
  </I18nextProvider>,
  document.getElementById("root")
);
