import axios from "axios";
import React, { Component } from "react";
import authHeader from "../services/auth-header";
import UserService from "../services/user-service";

export default class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
    };

    UserService.getPartners().then((response) => {
      this.setState({ partners: response.data });
    });
  }

  startConversation(id) {
    let params = {
      partner_id: id,
    };
    axios.post(`${window.API_URL}/conversations`, params, { headers: authHeader() }).then((response) => {
      console.log(response.data);
      this.props.history.push(`/conversations/${response.data.id}`);
    });
  }

  render() {
    const { partners } = this.state;
    return (
      <div className="container">
        <h1>Partners Page</h1>
        <p>Choose a partner to start a conversation with:</p>
        <div className="row gy-3">
          {partners.map((partner) => (
            <div key={partner.id} className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {partner.first_name} {partner.last_name}
                  </h5>
                  <p className="card-text">Patient Partner</p>
                  <button onClick={() => this.startConversation(partner.id)} className="btn btn-primary">
                    Start conversation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
