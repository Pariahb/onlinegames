import React from "react";
import "./style.css";

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      error: null
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
  render() {
    return (
      <React.Fragment>
        {this.props.yourRank !== this.props.rank ? (
          <div className="container" key={this.props.index}>
            <table
              className="leadertable"
              width="100%"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr className="board">
                  <td>
                    <span>
                      {this.toPersianDigits(this.props.rank.toString())}
                    </span>
                  </td>
                  <td>
                    <div className="avatarContainer">
                      <img
                        alt="avatar"
                        className="avatar"
                        style={{
                          backgroundColor: this.avatarGenerator(
                            this.props.userid
                          ).avatarBg
                        }}
                        src={this.avatarGenerator(this.props.userid).avatar}
                      />
                      <span>{this.props.username}</span>
                    </div>
                  </td>
                  <td>
                    <span>
                      {this.toPersianDigits(this.props.points.toString())}
                    </span>
                  </td>
                  <td>
                    <span>
                      {" "}
                      {this.props.prize === 0 ? (
                        "--"
                      ) : (
                        <div>
                          <span>
                            {parseFloat(this.props.prize).toLocaleString("fa")}
                          </span>{" "}
                          تومان
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
export default LeaderBoard;
