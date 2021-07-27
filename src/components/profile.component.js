import axios from "axios";
import { div } from "prelude-ls";
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      conversations: {},
    };

    axios.get(window.API_URL + `/users/${AuthService.getCurrentUserId()}`).then((response) => {
      this.setState({ currentUser: response.data });
      // console.log(response.data);
    });

    UserService.getUserConversations().then((response) => {
      // console.log(response.data);
      this.setState({ conversations: response.data });
    });
  }

  render() {
    const { conversations } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>
            <strong>{this.state.currentUser.first_name}'s</strong> Profile
          </h1>
          <h4>You are listed as a {this.state.currentUser.type_of} user</h4>
        </header>
        <h5>You currently have {conversations.length} conversation(s) active</h5>
      </div>
    );
  }
}
