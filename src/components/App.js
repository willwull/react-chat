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
      <div className="container-fluid">
        <div className="row">
          <ChatPanel username={this.state.username} />
        </div>
      </div>
    );
  }
}

export default App;
