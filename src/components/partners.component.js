import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";
export default class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
    };

    axios.get(API_URL + "/users").then((response) => {
      this.setState({ partners: response.data });
    });
  }

  render() {
    const { partners } = this.state;
    return (
      <div className="container">
        <h1>Partners Page</h1>
        <p>Choose a partner to start a conversation with:</p>
        <div class="row gy-3">
          {partners.map((partner) => (
            <div key={partner.id} class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    {partner.first_name} {partner.last_name}
                  </h5>
                  <p class="card-text">Patient Partner</p>
                  <Link to={`/partners/${partner.id}`} class="btn btn-primary">
                    Start conversation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
