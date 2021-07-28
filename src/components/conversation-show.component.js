import axios from "axios";
import React, { Component } from "react";
import moment from "moment";
import authHeader from "../services/auth-header";
import ActionCable from "actioncable";

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

    axios.get(window.API_URL + `/messages?id=${params.id}`).then((response) => {
      this.setState({
        messages: response.data,
      });
    });

    axios.get(window.API_URL + `/conversations/${params.id}`, { headers: authHeader() }).then((response) => {
      this.setState({
        conversation: response.data,
        patient: response.data.patient,
        partner: response.data.partner,
      });
    });
  }

  componentDidMount() {
    var cable = ActionCable.createConsumer(window.API_URL + "/cable");
    cable.subscriptions.create(
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
          this.state.messages.unshift(data);
          this.setState({ newMessage: "" });
        },
      }
    );
  }

  onChangeNewMessage = (e) => {
    this.setState({
      newMessage: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let newParams = {
      body: this.state.newMessage,
      conversation_id: this.state.conversation.id,
    };
    axios.post(`${window.API_URL}/messages`, newParams, { headers: authHeader() }).then((response) => {
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
        <form className="row g-3" onSubmit={this.handleSubmit}>
          <div className="col-auto">
            <textarea
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={newMessage}
              onChange={this.onChangeNewMessage}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-info mb-3">
              Send
            </button>
          </div>
        </form>

        {messages.map((message) => (
          <div key={message.id} className="card w-75">
            <div className="card-body">
              <h5 className="card-title">
                {message.user_id === conversation.patient_id ? patient.first_name : partner.first_name}
              </h5>
              <h6>{moment(message.created_at).calendar()}</h6>
              <p className="card-text">{message.body}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
