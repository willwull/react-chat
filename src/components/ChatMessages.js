import React from "react";
import ChatBubble from "./ChatBubble";
import "../stylesheets/ChatMessages.css";

/**
 * ChatMessages
 * The section in the chatbox that holds all messages. Child of ChatPanel.
 *
 * @prop {String} username The name of the logged in guest user
 * @prop {array} messages   An array of messages in the format:
 *                          {sender: String, time: Date, text: String}
 */
class ChatMessages extends React.Component {
  constructor(props) {
    super(props);
    this.formatMessages = this.formatMessages.bind(this);
  }

  componentDidUpdate(newProps) {
    // After this component is updated (i.e. new message)
    // scroll to the bottom
    let chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * formatMessages
   * Takes an array of messages and returns ChatBubble components.
   * The function checks each message sender to see if the current sender is
   * the same as the previous sender, and sends true/false as a prop to
   * ChatBubble.
   *
   * @param  {array} messages Text messages
   * @return {array}          ChatBubbles with the text messages
   */
  formatMessages(messages) {
    let prevSenderName = "";
    let formatted = messages.map((msg) => {
      let consecutive = msg.sender === prevSenderName ? true : false;
      prevSenderName = msg.sender;
      return (
        <ChatBubble key={msg.time}
          username={this.props.username}
          sender={msg.sender} time={msg.time} text={msg.text}
          consecutive={consecutive}
        />
      )
    });
    return formatted;
  }

  render() {
    return (
      <div id="chat-messages">
        {this.formatMessages(this.props.messages)}
      </div>
    )
  }
}

export default ChatMessages;
