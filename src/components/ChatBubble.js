import React from "react";
import PropTypes from "prop-types";
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
 */
function ChatBubble({ username, sender, time, text, isConsecutive }) {
  const me = username;

  // check if sender of message is me or them, add a class accordingly
  const senderClass = sender === me ? "from-me" : "from-them";

  return (
    <div className={`chat-bubble-container ${senderClass}`}>
      {!isConsecutive && <div className="sender-name">{sender}</div>}
      <div className="chat-bubble" data-time={time} title={`Sent by ${sender} at ${time}`}>
        {parseURLs(text)}
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  username: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isConsecutive: PropTypes.bool.isRequired,
};

export default ChatBubble;
