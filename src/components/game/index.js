import React from "react";
import LeaderBoard from "../leader-board";
import GameInfo from "../gameinfo";
// import axios from "axios";
import "./style.css";
import "../leader-board/style.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_REST_ENDPOINT,
      isLoaded: false,
      items: [],
      error: null,
      rootitems: [],
      isShow: this.props.showState,
      gameState: this.props.gameState
    };
    this.setGameToken = this.setGameToken.bind(this);
    this.appendToStorage = this.appendToStorage.bind(this);
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
  componentDidMount() {
    let gameID = localStorage.getItem("id");
    let gametoken = localStorage.getItem("token");

    const axios = require("axios");
    axios
      .get(
        this.state.endpoint +
          "/games/" +
          gameID +
          "/instances/" +
          gametoken +
          "/leaders",
        {
          headers: {
            "X-Session-ID": localStorage.getItem("sessionId")
          }
        }
      )
      .then(response => {
        this.setState({
          isLoaded: true,
          items: response.data.items,
          rootitems: response.data
        });
        let yourRank = response.data.your_points.toString();
        let yourPrize = response.data.your_prize;
        let yourNextLevelPoint = response.data.next_level_points;
        let yourNextLevelPrize = response.data.next_level_prize;
        this.props.popupInfo(
          yourRank,
          yourPrize,
          yourNextLevelPoint,
          yourNextLevelPrize
        );
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }
  appendToStorage(name, data) {
    let old = localStorage.getItem(name);
    if (old === null) old = "";
    localStorage.setItem(name, old + "," + data);
  }

  setGameToken() {
    sessionStorage.setItem("gamePage", this.props.gametoken);
    sessionStorage.setItem("firstStart", "true");
    this.appendToStorage("tokenarray", localStorage.getItem("token"));
  }

  render() {
    const { error, isLoaded, items, rootitems } = this.state;
    let avatarInfo = this.avatarGenerator(localStorage.getItem("id"));
    let localid = localStorage.getItem("id");
    let localtoken = localStorage.getItem("token");
    if (error) {
      return (
        <React.Fragment>
          <div className="error-section">
            <span>متاسفانه خطایی رخ داده است !</span>
            <button type="button" onClick={this.refreshPage}>
              تلاش مجدد
            </button>
          </div>
        </React.Fragment>
      );
    }
    if (!isLoaded) {
      return null;
    } else {
      return (
        <React.Fragment>
          <div
            style={{
              top: "0",
              position: "fixed",
              marginTop: "55px",
              height: "100%",
              backgroundColor: "#fff",
              width: "100%",
              overflow: "overlay"
            }}
          >
            <GameInfo
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
            />
            <div
              className="leaders"
              style={{
                height: "inherit"
              }}
            >
              <div className="header">
                <table
                  className="leadertable"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr className="board">
                      <th>رده</th>
                      <th>بازیکن</th>
                      <th>امتیاز</th>
                      <th>درآمد</th>
                    </tr>
                  </tbody>
                </table>
                <div className="container" key={this.props.index}>
                  <table
                    className="leadertable currentuser"
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr className="board">
                        <td>
                          <span className="font-bold">
                            {rootitems.your_rank === 0
                              ? "-"
                              : this.toPersianDigits(
                                  rootitems.your_rank.toString()
                                )}
                          </span>
                        </td>
                        <td>
                          <div className="avatarContainer">
                            <img
                              alt="avatar"
                              className="avatar"
                              style={{
                                backgroundColor: avatarInfo.avatarBg
                              }}
                              src={avatarInfo.avatar}
                            />
                            <span className="font-bold">خودت</span>
                          </div>
                        </td>
                        <td>
                          <span className="font-bold">
                            {this.toPersianDigits(
                              rootitems.your_points.toString()
                            )}
                          </span>
                        </td>
                        <td>
                          <span className="font-bold">
                            {rootitems.your_prize === 0
                              ? "--"
                              : parseFloat(rootitems.your_prize).toLocaleString(
                                  "fa"
                                ) + " تومان"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {items
                  ? items.map((item, index) => (
                      <LeaderBoard
                        index={item.index}
                        rank={item.rank}
                        yourRank={rootitems.your_rank}
                        points={item.points}
                        username={item.username}
                        userid={item.user_id}
                        prize={item.prize}
                        key={index}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div className="start">
              <a
                title="بازی رو شروع کن"
                className={this.props.active ? "active" : "deactive"}
                href={
                  this.props.game.game_url +
                  "?id=" +
                  localid +
                  "&?token=" +
                  localtoken +
                  "&?sessionid=" +
                  localStorage.getItem("sessionId")
                }
                onClick={this.setGameToken}
              >
                بازی رو شروع کن
              </a>
            </div>{" "}
          </div>
        </React.Fragment>
      );
    }
  }
}
export default Game;
