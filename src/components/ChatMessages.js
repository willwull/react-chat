import React from "react";
import ChatBubble from "./ChatBubble";
import "../stylesheets/ChatMessages.scss";

/**
 * ChatMessages
 * The section in the chatbox that holds all messages. Child of ChatPanel.
 *
 * @prop {String} username The name of the logged in guest user
 * @prop {array} messages   An array of messages in the format:
 *                          {sender: String, time: Date, text: String}
 */
class ChatMessages extends React.Component {
  componentDidUpdate() {
    // After this component is updated (i.e. new message)
    // scroll to the bottom
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
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
    const formatted = messages.map((msg) => {
      const isConsecutive = msg.sender === prevSenderName;
      prevSenderName = msg.sender;
      return (
        <ChatBubble
          key={msg.time}
          username={this.props.username}
          sender={msg.sender}
          time={msg.time}
          text={msg.text}
          isConsecutive={isConsecutive}
        />
      );
    });
    return formatted;
  }

  render() {
    return (
      <div id="chat-messages" ref={(ref) => { this.chatMessages = ref; }}>
        {this.formatMessages(this.props.messages)}
      </div>
    );
  }
}

export default ChatMessages;
