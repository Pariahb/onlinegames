import React, { Component } from "react";
import "./style.css";

export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className="navbar"
          style={{
            height: this.props.height,
            backgroundColor: this.props.bgColor
          }}
        >
          <span className="betaversion-badge">آزمایشی</span>

          <div
            className="navbar-headline"
            style={{ color: this.props.textColor }}
          >
            {this.props.text}
          </div>
          {typeof this.props.leftLink !== "function" ? (
            <a href={this.props.leftLink}>
              <div className="navbar-btn">
                <div className={`navbar-btn-icon ${this.props.iconLeft}`} />
              </div>
            </a>
          ) : (
            <div className="navbar-btn" onClick={this.props.leftLink}>
              <div
                className={`navbar-btn-icon ${this.props.iconLeft}`}
                style={{ color: this.props.textColor }}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
