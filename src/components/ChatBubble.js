import React from "react";
import "../stylesheets/ChatBubble.scss";

/**
 * parseURLs
 * Takes a text message and looks for URLs.
 * The URLs are converted to <a> links.
 *
 * @param  {String} text  The whole text message
 * @return {String}       The whole text message with working links
 */
function parseURLs(text) {
  return text
    .split(/((?:^|\s)(?:http|https|ftp):\/\/[^\s]+(?:$|\s))/gi)
    .map((part, i) => {
      if (i % 2 === 1) {
        return (
          <a
            className="chat-bubble-link"
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            key={part}
          >
            {part} <i className="fa fa-external-link" aria-hidden="true" />
          </a>
        );
      }
      return part;
    });
}

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
function ChatBubble({ username, sender, time, text, isConsecutive }) {
  const me = username;

  // check if sender of message is me or them, add a class accordingly
  const senderClass = sender === me ? "from-me" : "from-them";

  return (
    <div
      className={`chat-bubble-container ${senderClass}`}
      title={`Sent by ${sender} at ${time}`}
    >
      {!isConsecutive && <div className="sender-name">{sender}</div>}
      <div className="chat-bubble" data-time={time}>
        {parseURLs(text)}
      </div>
    </div>
  );
}

export default ChatBubble;
