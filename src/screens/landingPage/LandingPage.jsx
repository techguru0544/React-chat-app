import React from "react";
import "./LandingPage.css";
import SendIt from "../../assets/images/send.svg";

function LandingPage(props) {
  const { user } = props;
  console.log("user", user);
  return (
    <div>
      {user ? (
        <div className="landing-page-container">
          <div className="chat-head">
            <span className="username">{user.fullName}</span>
          </div>
          <div className="chat-wrapper">
            <div className="chat-inner-wrapper">
              <div className="chat-block left-side">
                <div className="msg">Hi, {user.firstName}</div>
              </div>
              <div className="chat-block right-side">
                <div className="msg">Hi, I am fine</div>
              </div>
            </div>
            <div className="send-wrapper">
              <input
                type="text"
                placeholder="what on your mind!!"
                className="form-control"
              />
              <button className="btn-send">
                <img src={SendIt} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="landing-page-container no-conversation">
          <h1> Select a Converstion</h1>
          <h5>
            <span>Start by selecting a convertion or</span>
            <br />
            <span>searching for someone specific</span>
          </h5>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
