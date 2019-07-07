import React, { Component } from "react";
import "./style.css";

class PrizeRange extends Component {
  constructor(props) {
    super(props);
    this.toPersianDigits = this.toPersianDigits.bind(this);
  }
  toPersianDigits(string) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return string.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="prize-range">
          <p>
            جایزه نفرات{" "}
            {this.toPersianDigits(this.props.prize.start.toString())} تا{" "}
            {this.toPersianDigits(this.props.prize.end.toString())}
          </p>
          <p>
            <span className="font-bold">
              {parseFloat(this.props.prize.prize).toLocaleString("fa")}
            </span>{" "}
            تومان
          </p>
        </div>
      </React.Fragment>
    );
  }
}
export default PrizeRange;
