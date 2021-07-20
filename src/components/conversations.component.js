import React, { Component } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";
export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };

    axios.get(API_URL + "/conversations").then((response) => {
      this.setState({ conversations: response.data });
      console.log(response.data);
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Conversations</h1>
      </div>
    );
  }
}
