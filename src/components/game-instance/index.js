import React from "react";
import { withRouter } from "react-router-dom";
import GamePage from "../gamepage";
import "./style.css";

class GamesInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: "",
      isLoaded: false,
      error: null,
      isShow: true,
      infoShow: false,
      gamePage: false,
      firstStart: sessionStorage.getItem("firstStart"),
      startStatus: "شروع",
      gameState: this.props.gameState
    };
    this.handleClick = this.handleClick.bind(this);
    this.backToList = this.backToList.bind(this);
    this.closePage = this.closePage.bind(this);
    this.removeDups = this.removeDups.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("gamePage") === this.props.gametoken) {
      this.props.hideTopbar();
      this.setState({
        gamePage: true
      });
    } else {
      this.setState({
        gamePage: false
      });
    }
    // let tokensArray = localStorage.getItem("tokenarray").split(",");
    // let newTokensArray = this.removeDups(tokensArray);
    // console.log("tokensArray", newTokensArray);
  }
  removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  handleClick(event) {
    localStorage.setItem(
      "id",
      event.target.closest(".gamebox").getAttribute("dataid")
    );
    localStorage.setItem(
      "token",
      event.target.closest(".gamebox").getAttribute("datatoken")
    );
    // localStorage.setItem("tokenarray", "");
    this.props.hideTopbar();
    this.setState({
      isShow: false,
      // targetToken: event.target.getAttribute("datatoken"),
      infoShow: true,
      gamePage: true
    });
  }
  backToList() {
    this.setState({ isShow: true });
    this.props.changeNavbarInfo("کیو گِیمز", null);
  }
  Unix_timestamp(t) {
    let dt = new Date(t * 1000);
    return dt;
  }

  toPersianDigits(string) {
    let id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return string.replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  }
  closePage() {
    if (this.state.gamePage) {
      sessionStorage.setItem("gamePage", null);
      this.props.showTopbar();
      this.setState({
        gamePage: false
      });
    }
  }

  render() {
    // let starttime = this.Unix_timestamp(this.props.starttime);
    let endtime = this.Unix_timestamp(this.props.endtime);
    let nowtime = new Date();
    let activeToEnd =
      Math.floor(Math.abs(endtime - nowtime) / 1000 / 3600) % 24;
    // let deactiveToEnd =
    //   Math.floor(Math.abs(starttime - nowtime) / 1000 / 3600) % 24;
    /*----------------------*/
    let myNowTime = new Date() / 1000;
    let myEndTime = this.props.endtime;
    let lastMinutes = myEndTime - myNowTime;
    let diffMins = Math.round(((lastMinutes % 86400000) % 3600000) / 60); // minutes
    return (
      <React.Fragment>
        <div
          className="gamebox"
          onClick={this.handleClick}
          dataid={this.props.gameid}
          datatoken={this.props.gametoken}
        >
          <div
            className={
              this.props.active ? "info-bar-active" : "info-bar-deactive"
            }
          >
            <span
              className={
                this.props.active
                  ? "active-circle main-list"
                  : "deactive-circle games"
              }
            >
              {this.props.active ? "فعال" : "تمام"}
            </span>
            <p className="deadline">
              {this.props.active
                ? activeToEnd < 1
                  ? this.toPersianDigits(diffMins.toString()) +
                    " دقیقه تا پایان"
                  : this.toPersianDigits(activeToEnd.toString()) +
                    " ساعت تا پایان"
                : null}
            </p>
          </div>

          <div
            className={
              this.props.active ? "game-info-active" : "game-info-deactive"
            }
          >
            <img
              className="image"
              src={
                !this.props.game.small_pic_url
                  ? require("../../../public/images/default_game_icon.png")
                  : this.props.game.small_pic_url
              }
              alt={this.props.game.name}
            />
            <div className="center">
              <span className="title">
                {!this.props.game.name ? "اسم مسابقه" : this.props.game.name}
              </span>
              <div className="prize">
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
              </div>
            </div>
            <div className="left">
              <div>
                <span className="icon-group" />
                <span className="players">
                  {this.toPersianDigits(this.props.players.toString())}
                </span>
              </div>
              <span
                className={
                  this.props.active
                    ? "go-to-game-active play-btn"
                    : "go-to-game-deactive play-btn"
                }
              >
                {this.props.active ? "شروع" : "برندگان"}
              </span>
            </div>
          </div>
        </div>
        {this.state.gamePage ? (
          <GamePage
            closePage={this.closePage}
            active={this.props.active}
            starttime={this.props.starttime}
            endtime={this.props.endtime}
            game={this.props.game}
            totalprize={this.props.totalprize}
            prizes={this.props.prizes}
            players={this.props.players}
            gameid={this.props.gameid}
            gametoken={this.props.gametoken}
            gamename={this.props.gamename}
            gameState={this.state.gameState}
            showState={this.state.infoShow}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
export default withRouter(GamesInstance);
