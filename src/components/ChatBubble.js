import React from "react";
import "../stylesheets/ChatBubble.css";

/**
 * ChatBubble
 * This component is used for chat bubbles in the ChatPanel component.
 *
 * @prop {String} username     The name of the logged in guest user
 * @prop {String} sender        The name of the sender
 * @prop {String} time          The date/time of the message
 * @prop {String} text          The message itself
 * @prop {Boolean} consecutive  True if prev. message sender is the same as this sender
 */
class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
    this.parseURLs = this.parseURLs.bind(this);
  }

  /**
   * parseURLs
   * Takes a text message and looks for URLs.
   * The URLs are converted to <a> links.
   *
   * @param  {String} text  The whole text message
   * @return {String}       The whole text message with working links
   */
  parseURLs(text) {
    return text
      .split(/((?:^|\s)(?:http|https|ftp):\/\/[^\s]+(?:$|\s))/gi)
      .map((part, i) => {
        if (i % 2 === 1) {
          return (
            <a className="chat-bubble-link" href={part} target="_blank" rel="noopener noreferrer">
              {part} <i className="fa fa-external-link" aria-hidden="true"></i>
            </a>
          );
        } else {
          return part;
        }
      });
  }

  render() {
    let me = this.props.username;

    // the class `chat-new-sender` adds more margin-top
    let classes = this.props.consecutive ? "chat-consecutive " : "chat-new-sender ";

    // check if sender of message is me or them, add a class accordingly
    if (this.props.sender === me) {
      classes += "from-me";
    } else {
      classes += "from-them";
    }

    return (
      <div className="chat-bubble-container container-fluid"
        title={"Sent by " + this.props.sender + " at " + this.props.time}
      >
        <div className={classes} data-time={this.props.time}>
          {this.parseURLs(this.props.text)}
        </div>
      </div>
    )
  }
}

export default ChatBubble;
