import React from "react";
import Threads from "./Threads";
import ChatPanel from "./ChatPanel";
import Loader from "./Loader";
import firebase, { database } from "../firebase";
import "../stylesheets/App.scss";

class App extends React.Component {
  state = {
    username: "",
    currentThreadName: "",
    currentThreadId: "",
    messages: [],
    threads: [],
    isLoading: false,
    showSidebarMobile: true,
  }

  componentDidMount() {
    this.handleLogin();
    this.loadThreads();
  }

  setCurrentThread = (newThreadId, newThreadName) => {
    // stop listening on the previous message thread
    database.ref(`messages/${this.state.currentThreadId}`).off();

    this.setState({
      currentThreadId: newThreadId,
      currentThreadName: newThreadName,
    });

    this.loadMessages(newThreadId);
  }

  loadMessages(threadId) {
    if (!threadId) return;
    this.setState({ messages: [] });

    database.ref(`messages/${threadId}`).on("value", (snapshot) => {
      if (!snapshot.val()) {
        return;
      }

      const messages = Object.entries(snapshot.val()).map(([key, val]) => ({ key, ...val }));
      this.setState({ messages });
    });
  }

  handleLogin() {
    firebase.auth().signInAnonymously()
      .catch((err) => {
        console.error(err);
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user has signed in
        console.log(user.uid);
        this.setState({ username: user.uid });
      } else {
        console.log("else");
      }
    });
  }

  loadThreads() {
    const ref = database.ref("threads");

    // set current thread to the first value
    ref.orderByKey().limitToFirst(1).once("value", (snapshot) => {
      const [key, value] = Object.entries(snapshot.val())[0];
      this.setCurrentThread(key, value.title);
    });

    ref.on("value", (snapshot) => {
      if (!snapshot.val()) return;

      const threads = Object.entries(snapshot.val()).map(([key, val]) => ({ key, ...val }));
      this.setState({ threads });
    });
  }

  sendMessage = (msgText) => {
    const { currentThreadId } = this.state;
    const time = Date.now();
    const msg = {
      sender: this.state.username,
      text: msgText,
      time,
    };

    // push message to the thread and set it as the last message of the thread
    const newKey = database.ref("messages").push().key;
    const updates = {
      [`messages/${currentThreadId}/${newKey}`]: msg,
      [`threads/${currentThreadId}/msg`]: msg,
    };
    database.ref().update(updates);
  }

  createNewThread = (title) => {
    database.ref("threads").push({
      title,
    });
  }

  toggleSidebar = () => {
    this.setState({ showSidebarMobile: !this.state.showSidebarMobile });
  }

  render() {
    const {
      username,
      currentThreadName,
      currentThreadId,
      messages,
      isLoading,
      threads,
      showSidebarMobile,
    } = this.state;
    const { sendMessage, setCurrentThread, createNewThread, toggleSidebar } = this;
    const { currentUser } = firebase.auth();

    if (!currentUser || isLoading) {
      return (
        <Loader />
      );
    }

    const containerClass = showSidebarMobile ? "threads" : "chat";

    return (
      <div id="container" className={containerClass}>
        <Threads
          toggleSidebar={toggleSidebar}
          threads={threads}
          currentThreadId={currentThreadId}
          setCurrentThread={setCurrentThread}
          createNewThread={createNewThread}
        />
        {currentThreadId && <ChatPanel
          toggleSidebar={toggleSidebar}
          chatName={currentThreadName}
          username={username}
          messages={messages}
          sendMessage={sendMessage}
        />}
      </div>
    );
  }
}

export default App;
