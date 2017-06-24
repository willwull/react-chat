import React from "react";
import ChatPanel from "./ChatPanel";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: true,
      username: "Bob"
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    this.setState({
      fullscreen: true
    })
  }

  render() {
    if(this.state.fullscreen) {
      return (
        <div id="fullscreen-app">
          <ChatPanel username={this.state.username} />
        </div>
      )
    }

    return (
      <div id="app" className="container">
        <h1>React chat <button onClick={this.clickHandler}>full screen</button></h1>
        <div id="chat-wrapper">
          <ChatPanel username={this.state.username} />
        </div>
      </div>
    );
  }
}

export default App;
