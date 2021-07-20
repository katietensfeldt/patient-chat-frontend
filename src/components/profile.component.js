import axios from "axios";
import { div } from "prelude-ls";
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";

const API_URL = "http://localhost:3000";
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      conversations: {},
    };

    axios.get(API_URL + `/users/${AuthService.getCurrentUserId()}`).then((response) => {
      this.setState({ currentUser: response.data });
      // console.log(response.data);
    });

    UserService.getUserConversations().then((response) => {
      // console.log(response.data);
      this.setState({ conversations: response.data });
    });
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{this.state.currentUser.first_name}'s</strong> Profile
          </h3>
          <p>{this.state.currentUser.type_of}</p>
        </header>
        <h4>Conversations:</h4>
        <div>
          {console.log(this.state.conversations)}

          {/* {this.state.conversations &&
            this.state.conversations.map((conversation) => {
              <div key={conversation.id}>{conversation.patient.first_name}</div>;
            })}
          ; */}
        </div>
      </div>
    );
  }
}
