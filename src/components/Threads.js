import React from "react";
import PropTypes from "prop-types";
import swal from "sweetalert2";
import ThreadItem from "./ThreadItem";
import "../stylesheets/Threads.scss";

function Threads({ toggleSidebar, createNewThread, currentThreadId, setCurrentThread, threads }) {
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
    }).then((input) => {
      if (!input) return;
      if (!input.value) return;

      const cleanedUpName = input.value.replace(/#/g, "");
      if (!cleanedUpName) return;

      createNewThread(cleanedUpName);
    });
  };

  return (
    <div id="threads">
      <div className="titlebar">
        Conversations
        <button id="new-convo-btn" onClick={clickHandler}>
          New
        </button>
      </div>
      <div className="list">
        {threads.map(thread => (
          <ThreadItem
            key={thread.key}
            thread={thread}
            toggleSidebar={toggleSidebar}
            isCurrent={currentThreadId === thread.key}
            setCurrentThread={setCurrentThread}
          />
        ))}
      </div>
    </div>
  );
}

Threads.propTypes = {
  createNewThread: PropTypes.func.isRequired,
  setCurrentThread: PropTypes.func.isRequired,
  currentThreadId: PropTypes.string.isRequired,
  threads: PropTypes.array.isRequired,
};

export default Threads;
