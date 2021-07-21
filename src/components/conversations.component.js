import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user-service";
import AuthService from "../services/auth-service";
export default class Conversations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };

    UserService.getUserConversations().then((response) => {
      this.setState({ conversations: response.data });
      console.log(response.data);
    });
  }

  render() {
    const { conversations } = this.state;
    return (
      <div className="container">
        <h1>Your Conversations</h1>
        {conversations.map((conversation) => (
          <div className="row gy-3" key={conversation.id}>
            {AuthService.getCurrentUserId() == conversation.patient_id ? (
              <div className="card col-5">
                <div className="card-body">
                  <h5 className="card-title">
                    {conversation.partner.first_name} {conversation.partner.last_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{conversation.partner.type_of}</h6>
                  <h6 className="card-subtitle mb-2">Last message:</h6>
                  <p className="card-text">
                    <strong>
                      {conversation.patient_id === conversation.last_message.user_id
                        ? "You: "
                        : `${conversation.partner.first_name}: `}
                    </strong>
                    {conversation.last_message.body}
                  </p>
                  <Link to={`/conversations/${conversation.id}`}>Click to continue conversation</Link>
                </div>
              </div>
            ) : (
              <div className="card col-5">
                <div className="card-body">
                  <h5 className="card-title">
                    {conversation.patient.first_name} {conversation.patient.last_name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{conversation.patient.type_of}</h6>
                  <h6 className="card-subtitle mb-2">Last message:</h6>

                  <p className="card-text">
                    <strong>
                      {conversation.partner_id === conversation.last_message.user_id
                        ? "You: "
                        : `${conversation.patient.first_name}: `}
                    </strong>
                    {conversation.last_message.body}
                  </p>
                  <Link to={`/conversations/${conversation.id}`}>Click to continue conversation</Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
