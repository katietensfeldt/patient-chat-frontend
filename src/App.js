import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import AuthService from "./services/auth-service";

import Home from "./components/home.component";
import PatientRegister from "./components/patient-register.component";
import PartnerRegister from "./components/partner-register.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import Partners from "./components/partners.component";
import Conversations from "./components/conversations.component";
import ConversationShow from "./components/conversation-show.component";

const API_URL = "http://localhost:3000";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    axios.get(API_URL + `/users/${AuthService.getCurrentUserId()}`).then((response) => {
      this.setState({ currentUser: response.data });
      // console.log(response.data);
    });
  }

  logOut = () => {
    AuthService.logout();
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Patient Chat
          </Link>
          {this.state.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {this.state.currentUser.first_name}
                </Link>
              </li>
              {this.state.currentUser.type_of === "patient" ? (
                <li className="nav-item">
                  <Link to={"/partners"} className="nav-link">
                    Patient Partners
                  </Link>
                </li>
              ) : (
                <li className="nav-item"></li>
              )}

              <li className="nav-item">
                <a href="/conversations" className="nav-link">
                  Conversations
                </a>
              </li>

              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/patient-register"} className="nav-link">
                  Register as Patient
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/partner-register"} className="nav-link">
                  Register as Patient Partner
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/patient-register" component={PatientRegister} />
            <Route exact path="/partner-register" component={PartnerRegister} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/partners" component={Partners} />
            <Route exact path="/conversations" component={Conversations} />
            <Route path="/conversations/:id" component={ConversationShow} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
