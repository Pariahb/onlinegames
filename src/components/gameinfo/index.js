import React from "react";
import "./style.css";
import PrizeRange from "../prize-range";

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      prizes: this.props.prizes
    };
  }
  toPersianDigits(string) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return string.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }
  avatarGenerator(userId) {
    let ic_avatar_01 = require("../../../public/images/ic_avatar_01.png");
    let ic_avatar_02 = require("../../../public/images/ic_avatar_02.png");
    let ic_avatar_03 = require("../../../public/images/ic_avatar_03.png");
    let ic_avatar_04 = require("../../../public/images/ic_avatar_04.png");
    let ic_avatar_05 = require("../../../public/images/ic_avatar_05.png");

    let profilePics = [
      ic_avatar_01,
      ic_avatar_02,
      ic_avatar_03,
      ic_avatar_04,
      ic_avatar_05
    ];
    let backgroundColors = [
      "#EC407A",
      "#FFB300",
      "#FDD835",
      "#00B0FF",
      "#5C6BC0",
      "#4DB6AC"
    ];
    let avatarIndex = userId % profilePics.length;
    let backgroundColorIndex = userId % backgroundColors.length;

    return {
      avatar: profilePics[avatarIndex],
      avatarBg: backgroundColors[backgroundColorIndex]
    };
  }
  Unix_timestamp(t) {
    let dt = new Date(t * 1000);
    return dt;
  }
  render() {
    // let starttime = this.Unix_timestamp(this.props.starttime);
    let endtime = this.Unix_timestamp(this.props.endtime);
    let nowtime = new Date();
    // let myNowtime = Date.now() / 1000;
    // let lastMinutes = endtime - myNowtime;
    // let lastMinutestime =
    //   Math.floor(Math.abs(this.Unix_timestamp(lastMinutes)) / 1000 / 60) % 24;
    let activeToEnd =
      Math.floor(Math.abs(endtime - nowtime) / 1000 / 3600) % 24;
    // let deactiveToEnd =
    //   Math.floor(Math.abs(starttime - nowtime) / 1000 / 3600) % 24;
    // if (activeToEnd < 1) {
    //   let newActiveToEnd = ((endtime - nowtime) / 1000 / 3600) % 24;
    // }
    /*----------------------*/
    let myNowTime = new Date() / 1000;
    let myEndTime = this.props.endtime;

    let lastMinutes = myEndTime - myNowTime;
    let diffMins = Math.round(((lastMinutes % 86400000) % 3600000) / 60); // minutes

    return (
      <React.Fragment>
        <div className="game-container">
          <div className="main-content">
            <div className="top-section">
              <img src={this.props.game.big_pic_url} alt="banner" />
              <div className="bottom-bar">
                {this.props.active ? null : (
                  <span className="deactive-circle">تمام</span>
                )}

                <p className="deadline">
                  {this.props.active
                    ? activeToEnd < 1
                      ? this.toPersianDigits(diffMins.toString()) +
                        " دقیقه تا پایان"
                      : this.toPersianDigits(activeToEnd.toString()) +
                        " ساعت تا پایان"
                    : null}
                </p>

                <span>
                  {this.toPersianDigits(this.props.players.toString())}
                  <span className="icon-group" />
                </span>
              </div>
            </div>
            <div className="bottom-section">
              <span className="main-prize">
                {this.props.totalprize !== undefined ? (
                  <div>
                    <span className="font-bold">
                      {parseFloat(this.props.totalprize).toLocaleString("fa")}
                    </span>{" "}
                    تومان جایزه
                  </div>
                ) : (
                  "بازی تمرینی"
                )}
              </span>
              <div className="prize-info">
                {this.state.prizes !== null &&
                this.props.totalprize !== undefined
                  ? this.state.prizes.map((prize, index) => (
                      <PrizeRange prize={prize} key={index} />
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default GameInfo;
