import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "../stylesheets/ChatPanel.css";

/**
 * ChatPanel
 * This component is for the chat area on the right side of the screen.
 *
 * @prop {String} username   the name of the user ("you")
 */
class ChatPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {sender: "Alice", time: "1", text: "Short message"},
        {sender: this.props.username, time: "2", text: "Hey, this is a slightly longer message!"},
        {sender: "Alice", time: "3", text: "How about a reeeeeeeeeeeeeeeeeeeeeeaaaaaalllllyyyyyyyyyyyyyyyyy long message?"},
        {sender: "Alice", time: "4", text: "Here are some"},
        {sender: "Alice", time: "5", text: "consecutive"},
        {sender: "Alice", time: "6", text: "messages"},
        {sender: this.props.username, time: "7", text: "That's pretty cool"}
      ]
    }

    this.sendMessage = this.sendMessage.bind(this);
  }

  /**
   * sendMessage - TODO
   * Sends the text message. Called from ChatInput.js
   *
   * @param  {String} msgText   The message
   */
  sendMessage(msgText) {
    let messagesNew = this.state.messages;
    let msg = {sender: this.props.username, time: new Date().toString(), text: msgText};
    messagesNew.push(msg);
    this.setState({
      messages: messagesNew
    });
  }

  render() {
    return (
      <div id="chat-panel" className="col-sm-4">
        <div id="chat-titlebar">
          <h1 id="chat-name">Alice Lastname</h1>
        </div>
        <ChatMessages username={this.props.username} messages={this.state.messages} />
        <ChatInput sendMessage={this.sendMessage} />
      </div>
    )
  }
}

export default ChatPanel;
