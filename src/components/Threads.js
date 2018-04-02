import React from "react";
import PropTypes from "prop-types";
import swal from "sweetalert2";
import ThreadItem from "./ThreadItem";
import "../stylesheets/Threads.scss";

function Threads(props) {
  const clickHandler = () => {
    swal({
      text: "Enter a name",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Create conversation",
      reverseButtons: true,
      customClass: "thread-popup",
      cancelButtonClass: "cancel",
      confirmButtonClass: "confirm",
      buttonsStyling: false,
    });
  };

  return (
    <div className="threads">
      <div className="titlebar">
        Conversations
        <button id="new-convo-btn" onClick={clickHandler}>
          New
        </button>
      </div>
      <div className="list">
        <ThreadItem title="react-chat" msg="lul" time="0" />
      </div>
    </div>
  );
}

Threads.propTypes = {

};

export default Threads;
