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

  return (
    <div
      className="thread-item"
      onClick={clickHandler}
      onKeyPress={keyHandler}
      role="menuitem"
      tabIndex="0"
    >
      <div>
        <div className="title">{thread.title}</div>
        <div className="last-msg">{"lul"}</div>
      </div>
      <div className="time">{"0"}</div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  setCurrentThread: PropTypes.func.isRequired,
};

export default ThreadItem;
