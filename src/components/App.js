import React from "react";
import Threads from "./Threads";
import ChatPanel from "./ChatPanel";
import Loader from "./Loader";
import firebase, { database } from "../firebase";
import "../stylesheets/App.scss";

class App extends React.Component {
  state = {
    username: "",
    messages: [],
    isLoading: true,
  }

  componentDidMount() {
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

    database.ref("messages").on("child_added", (snapshot) => {
      const msg = snapshot.val();
      const messagesNew = [...this.state.messages];
      messagesNew.push(msg);
      this.setState({ messages: messagesNew, isLoading: false });
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

  render() {
    const { username, messages, isLoading } = this.state;
    const { sendMessage } = this;
    const { currentUser } = firebase.auth();

    if (!currentUser || isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <div id="container">
        <Threads />
      <ChatPanel chatName="react-chat" username={username} messages={messages} sendMessage={sendMessage} />
      </div>
    );
  }
}

export default App;
