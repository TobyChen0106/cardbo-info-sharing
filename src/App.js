import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ViewPage from "./containers/ViewPage/ViewPage";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: cookies.get('cardbo-user-email'),
      userPassword: cookies.get('cardbo-user-password'),
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ViewPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

