import React from "react";
import ChatPanel from "./ChatPanel";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "Bob"
    }
  }
  render() {
    return (
      <div id="app" className="container">
        <h1>React chat</h1>
        <div id="chat-wrapper">
          <ChatPanel username={this.state.username} />
        </div>
      </div>
    );
  }
}

export default App;
