import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { database } from "../firebase";
import "../stylesheets/ChatPanel.scss";

/**
 * ChatPanel
 * This component is the "root" component of the entire chat system.
 *
 * @prop {String} username   the name of the user ("you")
 */
class ChatPanel extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    console.log("mount");
    const messagesRef = database.ref("messages");
    messagesRef.on("child_added", (snapshot) => {
      const msg = snapshot.val();
      const messagesNew = [...this.state.messages];
      messagesNew.push(msg);
      this.setState({ messages: messagesNew });
    });
  }

  /**
   * sendMessage - TODO
   * Sends the text message. Called from ChatInput.js
   *
   * @param  {String} msgText   The message
   */
  sendMessage = (msgText) => {
    const time = new Date();
    const msg = {
      sender: this.props.username,
      text: msgText,
      time: time.toString(),
    };
    database.ref("messages").push(msg);
  }

  /**
   * handleClick
   * Handles when the user clicks on #chat-content, which is the area below the
   * title bar. Calls the focusOnInput function of the ChatInput component.
   */
  handleClick = () => {
    this.input.focusOnInput();
  }

  render() {
    return (
      <div id="chat-panel">
        <div id="chat-titlebar">
          <h1 id="chat-name">Alice Lastname</h1>
        </div>
        <div id="chat-content" onClick={this.handleClick} role="presentation">
          <ChatMessages username={this.props.username} messages={this.state.messages} />
          <ChatInput ref={(ref) => { this.input = ref; }} sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}

export default ChatPanel;
