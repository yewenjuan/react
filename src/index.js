import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";
import store from "./redux/store";

import "./assets/css/common.css";
// import "./test/socketio_test.js"

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
