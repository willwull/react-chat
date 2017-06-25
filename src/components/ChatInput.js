import React from "react";
import "../stylesheets/ChatInput.css";

/**
 * ChatInput
 * This component is the input area for the chat and the send message button.
 *
 * @prop {function} sendMessage A function to send the message (from ChatPanel)
 */
class ChatInput extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handleSubmit
   * Tries to send the message, and then clears the input field.
   *
   * @param  {Submit} e   The form submit event, needed to prevent reloading
   */
  handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    let text = this.input.value;
    if(!text) return; // Do nothing when input is empty

    this.input.value = ""; // empty input field
    this.props.sendMessage(text);
  }

  render() {
    return (
      <form id="chat-input" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input
            className="text-input"
            type='text'
            maxLength='5000'
            ref={ref => this.input = ref}
            placeholder='Send message...'
          />
          <button
            className="send-btn"
            type='submit'
            value='Send'
          >
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-arrow-right fa-stack-1x"></i>
            </span>
          </button>
        </div>
      </form>
    )
  }
}

export default ChatInput;
