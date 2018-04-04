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
  }

  componentDidMount() {
    this.handleLogin();
    this.loadMessages();
    this.loadThreads();
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

  loadMessages() {
    database.ref("messages").on("child_added", (snapshot) => {
      const msg = snapshot.val();
      const messagesNew = [...this.state.messages, msg];
      this.setState({ messages: messagesNew, isLoading: false });
    });
  }

  loadThreads() {
    const ref = database.ref("threads");

    // set current thread to the first value
    ref.orderByKey().limitToFirst(1).once("value", (snapshot) => {
      const [key, value] = Object.entries(snapshot.val())[0];
      this.setCurrentThread(key, value.title);
    });

    // list all threads
    ref.on("child_added", (snapshot) => {
      const thread = {
        ...snapshot.val(),
        key: snapshot.key,
      };
      const threadsNew = [...this.state.threads, thread];
      this.setState({ threads: threadsNew });
    });
  }

  sendMessage = (msgText) => {
    const time = new Date();
    const msg = {
      sender: this.state.username,
      text: msgText,
      time: time.toString(),
    };
    database.ref("messages").push(msg);
  }

  setCurrentThread = (currentThreadId, currentThreadName) => {
    this.setState({ currentThreadId, currentThreadName });
  }

  createNewThread = (title) => {
    database.ref("threads").push({
      title,
    });
  }

  render() {
    const { username, currentThreadName, messages, isLoading, threads } = this.state;
    const { sendMessage, setCurrentThread, createNewThread } = this;
    const { currentUser } = firebase.auth();

    if (!currentUser || isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <div id="container">
        <Threads
          threads={threads}
          setCurrentThread={setCurrentThread}
          createNewThread={createNewThread}
        />
        <ChatPanel
          chatName={currentThreadName}
          username={username}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    );
  }
}

export default App;
