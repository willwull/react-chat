import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import "../stylesheets/ChatPanel.scss";

/**
 * ChatPanel
 * This component is the "root" component of the entire chat system.
 */
class ChatPanel extends React.Component {
  /**
   * handleClick
   * Handles when the user clicks on #chat-content, which is the area below the
   * title bar. Calls the focusOnInput function of the ChatInput component.
   */
  handleClick = () => {
    this.input.focusOnInput();
  }

  render() {
    const { chatName, username, messages, sendMessage } = this.props;
    const { handleClick } = this;
    return (
      <div id="chat-panel">
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
