import React from "react";
import "./style.css";
import "../preloading/style.css";
import GamesInstance from "../game-instance";
import SpecialGame from "../special-game";

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_REST_ENDPOINT,
      isShow: false,
      isLoaded: false,
      items: [],
      error: null,
      link: "",
      navtext: "کلوب بازی",
      gamePage: false,
      topBarDisplay: true,
      specialGames: [],
      gameState: null,
      webengage: window.webengage,
      hasSpecialGame: false,
      specialGameName: null,
      activeGames: []
    };
    this.changeNavbarInfo = this.changeNavbarInfo.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.hideTopbar = this.hideTopbar.bind(this);
    this.showTopbar = this.showTopbar.bind(this);
  }
  changeNavbarInfo(text, link) {
    this.setState({
      link: link,
      navtext: text
    });
  }
  apiCall() {
    const axios = require("axios");
    axios
      .get(this.state.endpoint + "/games/instances", {
        headers: {
          "X-Session-ID": localStorage.getItem("sessionId")
        }
      })
      .then(response => {
        this.setState({
          isLoaded: true,
          items: response.data.instances,
          isShow: false
        });

        let hasspecial = [];
        let sortedList = [];
        let actives = [];
        this.state.items.forEach(
          function(item) {
            if (item["active"] === true) {
              actives.push(item);
            }

            if (item["special"]) {
              hasspecial.push(item);
              if (hasspecial.length >= 2) {
                sortedList = hasspecial.sort(this.compareSpecialDates);
              } else {
                sortedList = hasspecial;
              }
              console.log("hasspecial", hasspecial);
              let nowtime = new Date();

              this.setState({
                activeGames: actives,
                specialGames: hasspecial,
                hasSpecialGame: true,
                specialGameName: hasspecial[0].game.name
              });

              if (this.state.specialGames[0].active !== true) {
                if (this.state.specialGames[0].end_time < nowtime / 1000) {
                  this.setState({
                    gameState: "finished"
                  });
                }
              }
              if (this.state.specialGames[0].active === true) {
                if (this.state.specialGames[0].start_time < nowtime / 1000) {
                  this.setState({ gameState: "started" });
                }
              }
              if (this.state.specialGames[0].active !== true) {
                if (this.state.specialGames[0].start_time > nowtime / 1000) {
                  this.setState({
                    gameState: "notstarted"
                  });
                }
              }
            }
          }.bind(this)
        );
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  isSpecialGame(x) {
    return x.special === true;
  }
  compareSpecialDates(a, b) {
    const timeA = a.end_time;
    const timeB = b.end_time;

    let comparison = 0;
    if (timeA < timeB) {
      comparison = 1;
    } else if (timeA > timeB) {
      comparison = -1;
    }
    return comparison;
  }
  componentDidMount() {
    this.apiCall();
    this.mycall = setInterval(this.apiCall, 30000);
    this.state.webengage.track("web_game_visited", {
      special_game_name: this.state.specialGameName,
      has_special_game: this.state.hasSpecialGame,
      active_games: this.state.activeGames.length
    });
  }
  hideTopbar() {
    this.setState({
      topBarDisplay: false
    });
  }
  showTopbar() {
    this.setState({
      topBarDisplay: true
    });
  }
  componentWillUnmount() {
    clearInterval(this.mycall);
  }
  refreshPage() {
    window.location.reload();
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error !== null) {
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
      return (
        <React.Fragment>
          <div className="loader-wrapper">
            <div className="loader" />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="top-bar"
            style={{ display: this.state.topBarDisplay ? "flex" : "none" }}
          >
            <span className="betaversion-badge">آزمایشی</span>
            <span>{this.state.navtext}</span>
            {this.props.deviceOS ? (
              <a
                href="https://minigames.snappq.com/quit"
                className="IOS-btn-icon icon-right-open-big"
              />
            ) : null}
          </div>

          <div className="box">
            {this.state.specialGames.length !== 0 ? (
              this.state.specialGames[0].special ? (
                <SpecialGame
                  active={this.state.specialGames[0].active}
                  starttime={this.state.specialGames[0].start_time}
                  endtime={this.state.specialGames[0].end_time}
                  game={this.state.specialGames[0].game}
                  totalprize={this.state.specialGames[0].total_prize}
                  prizes={this.state.specialGames[0].prizes}
                  players={this.state.specialGames[0].total_participants}
                  gameid={this.state.specialGames[0].game_id}
                  gametoken={this.state.specialGames[0].id}
                  gamename={this.state.specialGames[0].game.name}
                  changeNavbarInfo={this.changeNavbarInfo}
                  navtextState={this.state.navtext}
                  gamePage={this.state.gamePage}
                  hideTopbar={this.hideTopbar}
                  showTopbar={this.showTopbar}
                  apiCall={this.apiCall}
                  gameState={this.state.gameState}
                />
              ) : null
            ) : null}
            {items.length !== 0
              ? items.map((item, index) =>
                  item.special ? null : (
                    <GamesInstance
                      active={item.active}
                      starttime={item.start_time}
                      endtime={item.end_time}
                      game={item.game}
                      totalprize={item.total_prize}
                      prizes={item.prizes}
                      players={item.total_participants}
                      gameid={item.game_id}
                      gametoken={item.id}
                      gamename={item.game.name}
                      changeNavbarInfo={this.changeNavbarInfo}
                      navtextState={this.state.navtext}
                      gamePage={this.state.gamePage}
                      key={index}
                      hideTopbar={this.hideTopbar}
                      showTopbar={this.showTopbar}
                      gameState={this.state.gameState}
                    />
                  )
                )
              : null}
          </div>
        </React.Fragment>
      );
    }
  }
}
export default GamesList;
