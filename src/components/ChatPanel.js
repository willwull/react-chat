import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "../stylesheets/ChatPanel.css";

/**
 * ChatPanel
 * This component is the "root" component of the entire chat system.
 *
 * @prop {String} username   the name of the user ("you")
 */
class ChatPanel extends React.Component {
  state = {
    messages: [
      { sender: "Alice", time: "1", text: "Hey 👋" },
      { sender: this.props.username, time: "2", text: "Yo! Here's a slightly longer message 👍" },
      { sender: "Alice", time: "3", text: "How about a reeeeeeeeeeeeeeeeeeeeeeaaaaaalllllyyyyyyyyyyyyyyyyy long message? 😂😂" },
      { sender: "Alice", time: "4", text: "Long words line break automatically 👌" },
      { sender: this.props.username, time: "7", text: "Links work automatically too! Check it out: https://github.com/willwull/react-chat" },
    ],
  };

  /**
   * sendMessage - TODO
   * Sends the text message. Called from ChatInput.js
   *
   * @param  {String} msgText   The message
   */
  sendMessage = (msgText) => {
    const messagesNew = [...this.state.messages];
    const msg = { sender: this.props.username, time: new Date().toString(), text: msgText };
    messagesNew.push(msg);
    this.setState({ messages: messagesNew });
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
