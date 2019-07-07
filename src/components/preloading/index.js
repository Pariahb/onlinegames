import React from "react";
import "./style.css";

class Preload extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      localStorage.setItem("sessionId", window.token);
      window.location.href = "/gamelist";
    }, 1000);
    setTimeout(function() {
      console.log(window.token);
    }, 1500);
  }
  render() {
    return (
      <React.Fragment>
        <div className="loader-wrapper">
          <div className="loader" />
        </div>
      </React.Fragment>
    );
  }
}

export default Preload;
