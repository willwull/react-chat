import React from "react";
import "../stylesheets/GuestLogin.css";

/**
 * GuestLogin
 * This is the screen that the user sees when first opening the widget.
 */
class GuestLogin extends React.Component {
  constructor(props) {
    super(props);
    this.generateToken = this.generateToken.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * generateToken
   * Don't ask me what this does I have no idea.
   * Copied from wcg/wcg-test-client/testclient/main.js
   */
  generateToken() {
    var GUEST_TOKEN_RESOURCE = "guest-admin/tokens";
		var guTokenUrl = "http://127.0.0.3:8180/WCG/v3/" + GUEST_TOKEN_RESOURCE;
		var req = new XMLHttpRequest();
		var body = null;

		body = {
			expiryDate : "2020-01-31",
			owner : "sip:alice@wcg.ericsson.se",
			destination : "sip:bob@wcg.ericsson.se"
		};

		req.open("POST", guTokenUrl, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("Accept", "application/json, text/html");
    req.send(JSON.stringify(body, null, " "));

    var name = this.guestNameInput.value;
    var thisContext = this;

		req.onreadystatechange = function() {
			if (req.readyState === XMLHttpRequest.DONE && req.status >= 200 && req.status < 300) {
				var regexp = /(token": ")(.*)(?=")/g;
				var respTextArr = regexp.exec(req.responseText);
				if (respTextArr != null) {
					var tokenText = respTextArr[2];

          thisContext.props.setGuestInfo(name, tokenText);
				}
			}
		};
  }

  /**
   * handleSubmit
   * Is called when form in #guest-login-container is submitted.
   * This function will, if the name input is not empty, attempt to generate
   * a token and send it up to the Widget component.
   *
   * @param  {event} e  The submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    let name = this.guestNameInput.value;
    if(!name) return;

    this.generateToken();
  }

  componentDidMount() {
    // focus on the input field after loading the component
    this.guestNameInput.focus();
  }

  render() {
    return (
      <div id="guest-login-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guestNameInput">{"Hello! What's your name?"}</label>
          <br/>
          <input
            id="guestNameInput"
            type="text"
            ref={(input) => { this.guestNameInput = input; }}
          />
          <button
            id="guestNameSubmit"
            className="send-btn"
            type='submit'
            value='Send'
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default GuestLogin;
