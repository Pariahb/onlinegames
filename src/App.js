import React, { Component } from "react";
import GamesList from "./components/games-list";
import Game from "./components/game";
import Preload from "./components/preloading";
import "./App.css";
import { Route } from "react-router-dom";
import ClientJS from "clientjs/dist/client.min.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIOS: false
    };
  }
  componentDidMount() {
    let client = new ClientJS();
    let clientOS = client.getOS();
    if (clientOS.name === "iOS") {
      this.setState({
        isIOS: true
      });
    } else {
      this.setState({
        isIOS: false
      });
    }
    self.addEventListener("activate", function(e) {
      self.registration
        .unregister()
        .then(function() {
          return self.clients.matchAll();
        })
        .then(function(clients) {
          clients.forEach(client => {
            if (client.url && "navigate" in client) {
              client.navigate(client.url);
            }
          });
        });
    });
  }
  render() {
    return (
      <div className="App">
        <Route
          exact={true}
          path={"/"}
          render={props => <Preload {...props} />}
        />
        <Route
          exact={true}
          path={"/gamelist"}
          render={props => <GamesList deviceOS={this.state.isIOS} {...props} />}
        />
        <Route
          exact={true}
          path={"/gamelist/*"}
          render={props => <Game {...props} />}
        />
      </div>
    );
  }
}

export default App;
