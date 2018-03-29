import React from "react";
import ChatPanel from "./ChatPanel";

class App extends React.Component {
  state = {
    username: "Bob",
  }

  render() {
    return (
      <ChatPanel username={this.state.username} />
    );
  }
}

export default App;
