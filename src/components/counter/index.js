import React, { Component } from "react";
import "./style.css";

export default class Counter extends Component {
  toPersianDigits(number) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="clock-wrapper">
          {this.props.hours <= 0 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>۰</span>
            </div>
          ) : this.props.hours < 10 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>{this.toPersianDigits(this.props.hours.toString())}</span>
            </div>
          ) : (
            <div className="clock-box">
              <span>
                {this.toPersianDigits(this.props.hours.toString()).charAt(0)}
              </span>
              <span>
                {this.toPersianDigits(this.props.hours.toString()).charAt(1)}
              </span>
            </div>
          )}
          :
          {this.props.mins <= 0 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>۰</span>
            </div>
          ) : this.props.mins < 10 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>{this.toPersianDigits(this.props.mins.toString())}</span>
            </div>
          ) : (
            <div className="clock-box">
              <span>
                {this.toPersianDigits(this.props.mins.toString()).charAt(0)}
              </span>
              <span>
                {this.toPersianDigits(this.props.mins.toString()).charAt(1)}
              </span>
            </div>
          )}
          :
          {this.props.secs <= 0 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>۰</span>
            </div>
          ) : this.props.secs < 10 ? (
            <div className="clock-box">
              <span>۰</span>
              <span>{this.toPersianDigits(this.props.secs.toString())}</span>
            </div>
          ) : (
            <div className="clock-box">
              <span>
                {this.toPersianDigits(this.props.secs.toString()).charAt(0)}
              </span>
              <span>
                {this.toPersianDigits(this.props.secs.toString()).charAt(1)}
              </span>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
