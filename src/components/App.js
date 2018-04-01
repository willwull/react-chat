import React from "react";
import ChatPanel from "./ChatPanel";
import Loader from "./Loader";
import firebase from "../firebase";

class App extends React.Component {
  state = {
    username: "",
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
  }

  render() {
    const { username } = this.state;
    const { currentUser } = firebase.auth();

    if (!currentUser) {
      return (
        <Loader />
      );
    }
    return (
      <ChatPanel username={username} />
    );
  }
}

export default App;
