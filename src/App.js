import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import logo from './logo.svg';
import './App.css';

let connection = null;

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
    // connection = new HubConnectionBuilder().withUrl("http://localhost:61840/notificationhub", {
    //   accessTokenFactory: () => this.state.token
    // }).configureLogging(LogLevel.Debug).build();

    connection = new HubConnectionBuilder().withUrl("http://62.138.14.236:5006/notificationhub", {
      accessTokenFactory: () => this.state.token
    }).configureLogging(LogLevel.Debug).build();

    connection.start().catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("PlanUserNotificationAdded", (serverObj) => {
      console.log("PlanUserNotificationAdded: ", serverObj);
    });

    connection.on("CompanyUserNotificationAdded", (serverObj) => {
      console.log("CompanyUserNotificationAdded: ", serverObj);
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
