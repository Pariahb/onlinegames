import React, { Component } from "react";
import moment from "jalali-moment";

// import "./style.css";

export default class JalaliDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time
    };
  }
  toPersianDigits(number) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }

  render() {
    let date = moment
      .unix(this.state.time * 1000)
      .locale("fa")
      .format("YYYY/MM/DD");
    let faYear = this.toPersianDigits(date.slice(0, 4));
    let faMonth = this.toPersianDigits(date.slice(5, 7));
    let faDay = this.toPersianDigits(date.slice(8, 10));

    return <span>{faYear + "/" + faMonth + "/" + faDay}</span>;
  }
}
