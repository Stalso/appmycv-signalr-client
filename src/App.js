import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import logo from './logo.svg';
import './App.css';

let connection = null;
let chatConnection = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }

  handleChange = (event) => {
    this.setState({ token: event.target.value });
  }

  handleReconnect = () => {
    if (connection) {
      connection.stop();
    }
    if (chatConnection) {
      chatConnection.stop();
    }
    connection = new HubConnectionBuilder().withUrl("http://localhost:61840/notificationhub", {
      accessTokenFactory: () => this.state.token
    }).configureLogging(LogLevel.Debug).build();

    // connection = new HubConnectionBuilder().withUrl("http://62.138.14.236:5006/notificationhub", {
    //   accessTokenFactory: () => this.state.token
    // }).configureLogging(LogLevel.Debug).build();

    connection.start().catch(function (err) {
      return console.error(err.toString());
    });

    chatConnection = new HubConnectionBuilder().withUrl("http://localhost:61840/messaginghub", {
      accessTokenFactory: () => this.state.token
    }).configureLogging(LogLevel.Debug).build();

    chatConnection.start().catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("PlanUserNotificationAdded", (serverObj) => {
      console.log("PlanUserNotificationAdded: ", serverObj);
    });

    connection.on("CompanyUserNotificationAdded", (serverObj) => {
      console.log("CompanyUserNotificationAdded: ", serverObj);
    });

    chatConnection.on("NewThreadStarted", (serverObj) => {
      console.log("NewThreadStarted: ", serverObj);
    });

    chatConnection.on("PlanUserAddedToThread", (serverObj) => {
      console.log("PlanUserAddedToThread: ", serverObj);
    });

    chatConnection.on("CompanyUserAddedToThread", (serverObj) => {
      console.log("CompanyUserAddedToThread: ", serverObj);
    });

    chatConnection.on("WholeCompanyAddedToThread", (serverObj) => {
      console.log("WholeCompanyAddedToThread: ", serverObj);
    });

    chatConnection.on("UserOnline", (serverObj) => {
      console.log("UserOnline: ", serverObj);
    });

    chatConnection.on("UserOffline", (serverObj) => {
      console.log("UserOffline: ", serverObj);
    });

    chatConnection.on("YouWereRemovedFromThread", (serverObj) => {
      console.log("YouWereRemovedFromThread: ", serverObj);
    });

    chatConnection.on("PlanUserRemovedFromThread", (serverObj) => {
      console.log("PlanUserRemovedFromThread: ", serverObj);
    });

    chatConnection.on("CompanyUserRemovedFromThread", (serverObj) => {
      console.log("CompanyUserRemovedFromThread: ", serverObj);
    });

    chatConnection.on("CompanyRemovedFromThread", (serverObj) => {
      console.log("CompanyRemovedFromThread: ", serverObj);
    });

    chatConnection.on("YouLeavedThread", (serverObj) => {
      console.log("YouLeavedThread: ", serverObj);
    });

    chatConnection.on("CompanyUserLeavedThread", (serverObj) => {
      console.log("CompanyUserLeavedThread: ", serverObj);
    });

    chatConnection.on("PlanUserLeavedThread", (serverObj) => {
      console.log("PlanUserLeavedThread: ", serverObj);
    });

    chatConnection.on("NewMessageInThread", (serverObj) => {
      console.log("NewMessageInThread: ", serverObj);
    });

    chatConnection.on("FirstMessageRead", (serverObj) => {
      console.log("FirstMessageRead: ", serverObj);
    });

    chatConnection.on("LastMessageRead", (serverObj) => {
      console.log("LastMessageRead: ", serverObj);
    });

    chatConnection.on("MessagesRemovedFromThread", (serverObj) => {
      console.log("MessagesRemovedFromThread: ", serverObj);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <input type="text" value={this.state.token} onChange={this.handleChange}></input>
          <button onClick={this.handleReconnect}>Reconnect</button>
        </div>
      </div>
    );
  }
}

export default App;
