import React, { Component } from "react";
import "./style.css";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPrize: 0,
      nextPoint: 0,
      yourPrize: 0,
      gameType: null,
      yourRank:0,
      gamename:"",
      webengage: window.webengage,
      gametoken: ""
    };

    this.toPersianDigits = this.toPersianDigits.bind(this);
    this.setRetryEvent = this.setRetryEvent.bind(this);
  }
  setWebWngageEvent(){
    this.setRetryEvent()
  }
  setRetryEvent(){
    let myNowTime = new Date() / 1000;
    let myEndTime = this.props.endtime;
    let lastMinutes = myEndTime - myNowTime;
    let diffMins = Math.round(((lastMinutes % 86400000) % 3600000) / 60); // minutes

    this.state.webengage.track("web_game_retry", {
      game_name: this.props.gamename,
      game_token : this.props.gametoken,
      remaining_time: diffMins,
      score: this.props.yourRank,
      current_participants:this.props.players,
      amount_won: this.props.yourPrize
    });
  }
  toPersianDigits(string) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return string.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }
  Unix_timestamp(t) {
    let dt = new Date(t * 1000);
    return dt;
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.yourNextLevelPrize !== this.props.yourNextLevelPrize) {
      this.setState({
        nextPrize: this.props.yourNextLevelPrize,
        nextPoint: this.props.yourNextLevelPoint,
        yourPrize: this.props.yourPrize,
        yourPoints: this.props.yourRank,
        gameType: localStorage.getItem("gameType"),
        gamename: this.props.gamename

      });
    }

  }
  // webEngage(){
  //   console.log("typepop",this.props.gameType)
  //   console.log("game_namepop",this.props.gamename)
  //   console.log("game_tokenpop", this.props.gametoken)
  //   console.log("scorepop", this.state.yourPoints)
  //   // console.log("rankpop", this.porps.yourRank)
  //   // console.log("amount_wonpop", this.porps.yourPrize)
  //   this.state.webengage.track("web_game_submit_score", {
  //     type: this.props.gameType,
  //     game_name: this.props.gamename,
  //     game_token : this.state.gametoken,
  //     score: this.state.yourPoints
  //     // rank:this.props.yourRank,
  //     // amount_won: this.props.yourPrize
  //   });
  // }
  render() {

    let localid = localStorage.getItem("id");
    let localtoken = localStorage.getItem("token");
    let endtime = this.Unix_timestamp(this.props.endtime);
    let nowtime = new Date();
    let activeToEnd =
      Math.floor(Math.abs(endtime - nowtime) / 1000 / 3600) % 24;
    /*----------------------*/
    let myNowTime = new Date() / 1000;
    let myEndTime = this.props.endtime;
    let lastMinutes = myEndTime - myNowTime;
    let diffMins = Math.round(((lastMinutes % 86400000) % 3600000) / 60); // minutes
    return (
      <React.Fragment>
        <div className="popup-wrapper">
          <div className="popup-box">
            <div className="close-btn" onClick={this.props.closePopup} />
            <div className="popup-image" />
            <div className="popup-rank">
              <span>امتیاز</span>
              <span>
                {this.props.yourRank !== null
                  ? this.toPersianDigits(this.props.yourRank)
                  : null}
              </span>
            </div>
            <div className="popup-rank">
              <span>درآمد</span>
              <span>
                {this.props.yourPrize !== null
                  ? this.toPersianDigits(this.props.yourPrize.toString())
                  : null}{" "}
                تومان
              </span>
            </div>
            <div>
              {this.state.yourPrize === 0 ? null : (
                <div className="popup-h2">:) برنده شدی</div>
              )}
              {this.state.nextPoint === 0 ? null : (
                <div className="popup-h1">
                  {this.state.nextPoint !== null
                    ? this.toPersianDigits(this.state.nextPoint.toString())
                    : null}{" "}
                  امتیاز بگیر تا{" "}
                  {this.state.nextPrize !== null
                    ? this.toPersianDigits(this.state.nextPrize.toString())
                    : null}{" "}
                  تومان ببری
                </div>
              )}
            </div>
            <a onClick={this.setRetryEvent}
              href={
                this.props.game.game_url +
                "?id=" +
                localid +
                "&?token=" +
                localtoken +
                "&?sessionid=" +
                localStorage.getItem("sessionId")
              }
            >
              <div className="popup-btn">دوباره بازی کن!</div>
            </a>
            <div className="popup-footnote">
              {" "}
              {this.props.active
                ? activeToEnd < 1
                  ? this.toPersianDigits(diffMins.toString()) +
                    " دقیقه مانده تا نتایج نهایی مسابقه"
                  : this.toPersianDigits(activeToEnd.toString()) +
                    " ساعت مانده تا نتایج نهایی مسابقه"
                : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Popup;
