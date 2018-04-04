import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/ThreadItem.scss";

const ENTER_KEY_CODE = 13;

function ThreadItem({ thread, setCurrentThread }) {
  const clickHandler = () => {
    setCurrentThread(thread.key, thread.title);
  };

  const keyHandler = (e) => {
    if (e.which === ENTER_KEY_CODE) {
      clickHandler();
    }
  };

  const msgText = thread.msg ? thread.msg.text : "No messages yet";
  const msgTime = thread.msg ? thread.msg.time : "";

  return (
    <div
      className="thread-item"
      onClick={clickHandler}
      onKeyPress={keyHandler}
      role="menuitem"
      tabIndex="0"
    >
      <div>
        <div className="title">#{thread.title}</div>
        <div className="last-msg">{msgText}</div>
      </div>
      <div className="time">{msgTime}</div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    msg: PropTypes.shape({
      text: PropTypes.string,
      time: PropTypes.string,
    }),
  }).isRequired,
  setCurrentThread: PropTypes.func.isRequired,
};

export default ThreadItem;
