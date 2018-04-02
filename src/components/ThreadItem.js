import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/ThreadItem.scss";

function ThreadItem({ title, msg, time }) {
  return (
    <div className="thread-item">
      <div className="title">{title}</div>
      <div className="last-msg">{msg}</div>
      <div className="time">{time}</div>
    </div>
  );
}

ThreadItem.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ThreadItem;
