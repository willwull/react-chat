import React from "react";
import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";
import "../stylesheets/Threads.scss";

function Threads(props) {
  return (
    <div className="threads">
      <div className="titlebar">Conversations</div>
      <div className="list">
        <ThreadItem title="react-chat" msg="lul" time="0" />
      </div>
    </div>
  );
}

Threads.propTypes = {

};

export default Threads;
