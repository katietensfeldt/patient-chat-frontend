import axios from "axios";
import React, { Component } from "react";
import authHeader from "../services/auth-header";
import ActionCable from "actioncable";

const API_URL = "http://localhost:3000";

export default class ConversationShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: {},
      patient: {},
      partner: {},
      messages: [],
      newMessage: "",
    };

    const {
      match: { params },
    } = props;

    axios.get(API_URL + `/conversations/${params.id}`, { headers: authHeader() }).then((response) => {
      this.setState({
        conversation: response.data,
        patient: response.data.patient,
        partner: response.data.partner,
        messages: response.data.messages,
      });
      console.log(this.state.conversation);
    });
  }

  componentDidMount() {
    this.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    this.messagesChannel = this.cable.subscriptions.create(
      {
        channel: "MessagesChannel",
      },
      {
        connected: () => {
          console.log("Connected to messages channel");
        },
        disconnected: () => {},
        received: (data) => {
          console.log(data);
          this.setState({ messages: this.state.messages.shift(data) });
        },
      }
    );
  }

  onChangeNewMessage = (e) => {
    this.setState({
      newMessage: e.target.value,
    });
  };

  sendMessage = () => {
    let params = {
      body: this.state.newMessage,
      conversation_id: this.state.conversation.id,
    };
    axios.post(`${API_URL}/messages`, params, { headers: authHeader() }).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    const { conversation, patient, partner, messages, newMessage } = this.state;

    return (
      <div>
        <h2>Conversation</h2>
        <h4>
          <strong>{patient.first_name}</strong> and <strong>{partner.first_name}</strong>
        </h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message"
            aria-label="Type your message"
            aria-describedby="button-addon2"
            value={newMessage}
            onChange={this.onChangeNewMessage}
          />
          <button onClick={this.sendMessage} className="btn btn-info" type="button" id="button-addon2">
            Send message
          </button>
        </div>
        {messages.map((message) => (
          <div key={message.id} className="card w-75">
            <div className="card-body">
              <h5 className="card-title">
                {message.user_id === conversation.patient_id ? patient.first_name : partner.first_name}
              </h5>
              <p className="card-text">{message.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
