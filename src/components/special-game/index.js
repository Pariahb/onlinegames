import React from "react";
import "./style.css";
import Counter from "../counter";
import GamePage from "../gamepage";
import JalaliDate from "../jalali-date";

class SpecialGame extends React.Component {
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
      hours: 0,
      mins: 0,
      secs: 0,
      starthours: 0,
      startmins: 0,
      startsecs: 0,
      gameState: this.props.gameState,
      startTime: this.props.starttime,
      endTime: this.props.endtime,
      gameType: "special"
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
    setInterval(() => {
      let endTime = new Date(this.props.endtime * 1000);
      let startTime = new Date(this.props.starttime * 1000);

      let now = new Date();
      let difference2 = startTime.getTime() - now.getTime();
      let difference = endTime.getTime() - now.getTime();
      let secs = Math.floor(difference / 1000);
      let mins = Math.floor(secs / 60);
      let hours = Math.floor(mins / 60);
      let days = Math.floor(hours / 24);

      let startsecs = Math.floor(difference2 / 1000);
      let startmins = Math.floor(startsecs / 60);
      let starthours = Math.floor(startmins / 60);
      let startdays = Math.floor(starthours / 24);
      difference <= 0
        ? this.state.gameState === "started"
          ? this.setState({
              hours: 0,
              mins: 0,
              secs: 0,
              gameState: "finished"
            })
          : null
        : this.setState({
            hours: days > 0 ? hours : hours % 24,
            mins: mins % 60,
            secs: secs % 60,
            gameState: "started"
          });
      difference2 <= 0
        ? this.state.gameState === "notstarted"
          ? this.setState({
              starthours: 0,
              startmins: 0,
              startsecs: 0,
              gameState: "started"
            })
          : null
        : this.setState({
            starthours: startdays > 0 ? starthours : starthours % 24,
            startmins: startmins % 60,
            startsecs: startsecs % 60,
            gameState: "notstarted"
          });
    }, 1000);
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
      event.target.closest(".special-gamebox").getAttribute("dataid")
    );
    localStorage.setItem(
      "token",
      event.target.closest(".special-gamebox").getAttribute("datatoken")
    );
    this.props.hideTopbar();
    this.setState({
      isShow: false,
      infoShow: true,
      gamePage: true

    });
    localStorage.setItem("gameType",this.state.gameType);

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.gameState !== this.props.gameState) {
      this.setState({
        gameState: this.props.gameState
      });
    }
    if (prevProps.startTime !== this.props.startTime) {
      this.setState({
        startTime: this.props.starttime
      });
    }
    if (prevProps.endTime !== this.props.endTime) {
      this.setState({
        endTime: this.props.endtime
      });
    }
  }

  backToList() {
    this.setState({ isShow: true });
    this.props.changeNavbarInfo("کلوب بازی", null);
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
    return (
      <React.Fragment>
        <div
          className={"special-gamebox " + this.state.gameState}
          onClick={this.handleClick}
          dataid={this.props.gameid}
          datatoken={this.props.gametoken}
          style={{ backgroundImage: `url(${this.props.game.big_pic_url})` }}
        >
          <div className={"foreground-box-" + this.state.gameState}>
            <span className="title">
              {!this.props.game.name ? "اسم مسابقه" : this.props.game.name}
            </span>
            <div className="prize">
              <div>
                <span className="price">
                  {parseFloat(this.props.totalprize).toLocaleString("fa")}
                </span>{" "}
                تومان جایزه
              </div>
            </div>
            {this.state.gameState === "finished" ? (
              <div>
                <Counter
                  hours="0"
                  mins="0"
                  secs="0"
                  gameState={this.state.gameState}
                />
                <div>
                  مسابقه ویژه <JalaliDate time={this.state.startTime / 1000} />{" "}
                  تمام شد
                </div>
              </div>
            ) : null}
            {this.state.gameState === "started" ? (
              <div>
                <Counter
                  hours={this.state.hours}
                  mins={this.state.mins}
                  secs={this.state.secs}
                  gameState={this.state.gameState}
                />
                {this.state.gameState === "finished" ? (
                  <div>
                    مسابقه ویژه{" "}
                    <JalaliDate time={this.state.startTime / 1000} /> تمام شد
                  </div>
                ) : null}
                {this.state.gameState === "started" ? (
                  <div>
                    تا پایان مسابقه ویژه{" "}
                    <JalaliDate time={this.state.startTime / 1000} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className={"special-game-info-" + this.state.gameState}>
            {this.state.gameState === "started" ? (
              <span
                className={"go-to-game-" + this.state.gameState + " play-btn"}
              >
                بزن بریم، شروع شد
              </span>
            ) : null}
            {this.state.gameState === "finished" ? (
              <div>
                <span
                  className={"go-to-game-" + this.state.gameState + " play-btn"}
                >
                  مشاهده برندگان{" "}
                </span>
              </div>
            ) : null}
            {this.state.gameState === "notstarted" ? (
              <div className="notstarted-bar">
                <div>
                  تا شروع مسابقه ویژه{" "}
                  <JalaliDate time={this.state.startTime / 1000} />:
                </div>
                <Counter
                  hours={this.state.starthours}
                  mins={this.state.startmins}
                  secs={this.state.startsecs}
                  gameState={this.state.gameState}
                />
              </div>
            ) : null}
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
            showState={this.state.infoShow}
            gameType={localStorage.getItem("gameType")}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
export default SpecialGame;
