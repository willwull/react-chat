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
      <ChatPanel username={this.state.username} />
    )
  }
}

export default App;
