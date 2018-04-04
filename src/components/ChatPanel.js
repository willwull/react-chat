import React from "react";
import PropTypes from "prop-types";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "../stylesheets/ChatPanel.scss";

/**
 * ChatPanel
 * This component is the "root" component of the entire chat system.
 */
class ChatPanel extends React.Component {
  static propTypes = {
    chatName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
    })).isRequired,
    sendMessage: PropTypes.func.isRequired,
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
    const { chatName, username, messages, sendMessage, toggleSidebar } = this.props;
    const { handleClick } = this;
    return (
      <div id="chat-panel">
        <button onClick={toggleSidebar}>Click me</button>
        <div id="chat-titlebar">
          <h1 id="chat-name">{chatName}</h1>
        </div>
        <div id="chat-content" onClick={handleClick} role="presentation">
          <ChatMessages username={username} messages={messages} />
          <ChatInput ref={(ref) => { this.input = ref; }} sendMessage={sendMessage} />
        </div>
      </div>
    );
  }
}

export default ChatPanel;
