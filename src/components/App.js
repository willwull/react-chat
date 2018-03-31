import React from "react";
import ChatPanel from "./ChatPanel";

class App extends React.Component {
  state = {
    username: "",
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const inputVal = e.target.username.value;
    if (!inputVal) return;

    this.setState({ username: inputVal });
  }

  render() {
    const { username } = this.state;
    if (!username) {
      return (
        <div>
          <form onSubmit={this.onFormSubmit}>
            <input type="text" name="username" id="username" />
            <button type="submit">Set name</button>
          </form>
        </div>
      );
    }
    return (
      <ChatPanel username={this.state.username} />
    );
  }
}

export default App;
