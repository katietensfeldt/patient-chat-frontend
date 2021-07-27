import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome to Patient Chat</h1>
        <p>Sign up or log in to get started</p>
        <p>To test out a patient profile, sign in as 'katie@gmail.com' with password 'password'</p>
        <p>To test out a partner profile, sing in as 'bob@gmail.com' with password 'password'</p>
      </div>
    );
  }
}
