import React, { Component } from "react";
import "./style.css";
import Navbar from "../navbar";
import Game from "../game";
import Popup from "../popup";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      yourRank: null,
      yourPrize: null,
      yourNextLevelPoint: null,
      yourNextLevelPrize: null,
      gameState: this.props.gameState
    };
    this.closePopup = this.closePopup.bind(this);
    this.popupInfo = this.popupInfo.bind(this);
  }
  goBack() {
    return window.goBack;
  }
  componentDidMount() {
    if (sessionStorage.getItem("gamePage") === this.props.gametoken) {
      this.setState({
        popup: true
      });
    } else {
      this.setState({
        popup: false
      });
    }
  }
  popupInfo(yourRank, yourPrize, yourNextLevelPoint, yourNextLevelPrize) {
    this.setState({
      yourRank: yourRank,
      yourPrize: yourPrize,
      yourNextLevelPoint: yourNextLevelPoint,
      yourNextLevelPrize: yourNextLevelPrize
    });
  }
  closePopup() {
    if (this.state.popup) {
      this.setState({
        popup: false
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="page">
          <Navbar
            text={this.props.gamename}
            iconLeft={"icon-right-open-big"}
            leftLink={this.props.closePage}
            bgColor={"#ffffff"}
            height={"25px"}
          />

          <Game
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
            popupInfo={this.popupInfo}
            gameState={this.state.gameState}
          />
        </div>
        {this.state.popup ? (
          <Popup
            active={this.props.active}
            game={this.props.game}
            closePopup={this.closePopup}
            yourRank={this.state.yourRank}
            yourPrize={this.state.yourPrize}
            yourNextLevelPoint={this.state.yourNextLevelPoint}
            yourNextLevelPrize={this.state.yourNextLevelPrize}
            starttime={this.props.starttime}
            endtime={this.props.endtime}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
export default GamePage;
