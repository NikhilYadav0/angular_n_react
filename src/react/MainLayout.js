import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavTab from "./src/Components/nav_tab";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import LearnExplore from "./src/Components/learn_explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEnvelope,
  faChartBar,
  faTasks,
  faBook
} from "@fortawesome/free-solid-svg-icons";
// import chapsList from "./src/Components/chapsList";
export default class App extends Component {
  componentWillMount() {
    // Dimensions.addEventListener("change", e => {
    //   this.setState({ width: (100 * e.window.width) / e.screen.width });
    // });
  }
  render() {
    return (
      // <NavTab />
      <BrowserRouter>
        <img
          style={{
            position: "absolute",
            top: 0,
            zIndex: "revert",
            height: 250,
            width: "100%"
          }}
          src="https://d1l59jsi25mzk9.cloudfront.net/apps3/build/images/DoubtForum/doubtforumbanner.png"
        />
        <div>
          {/* {Dimensions.get("window").width > 760 ? ( */}
          <div style={{ backgroundColor: "#5f3694" }}>
            <Card.Header as="h3">
              <div
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <img
                  style={{
                    height: 25 * 1.4,
                    width: 130 * 1.4,
                    marginLeft: 20
                  }}
                  src="https://d1l59jsi25mzk9.cloudfront.net/apps3/build/images/logo.png"
                />

                <div
                  style={{
                    margin: 10,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap"
                  }}
                >
                  <FontAwesomeIcon
                    title="Home"
                    icon={faHome}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="tasks"
                    icon={faTasks}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="Home"
                    icon={faEnvelope}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="faChartBar"
                    icon={faChartBar}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="book"
                    icon={faBook}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="Home"
                    icon={faHome}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="tasks"
                    icon={faTasks}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="Home"
                    icon={faEnvelope}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="faChartBar"
                    icon={faChartBar}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="book"
                    icon={faBook}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="Home"
                    icon={faHome}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="tasks"
                    icon={faTasks}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="Home"
                    icon={faEnvelope}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="faChartBar"
                    icon={faChartBar}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                  <FontAwesomeIcon
                    title="book"
                    icon={faBook}
                    style={{ color: "#ffffff", marginLeft: 20 }}
                  />
                </div>
              </div>
            </Card.Header>
          </div>
          {/* ) : null} */}
        </div>
        <Switch>
          {/* <Route
            path="/home/learn-book/:subjectId/:subjectName/:iconURL/:classCode/:classId/:className/CBSE/prime/:colorCode//false"
            component={chapsList}
          /> */}
          {/* <Route path="/home/learn-explore" component={LearnExplore} /> */}
          <Route path="/" exact component={NavTab} />
        </Switch>
      </BrowserRouter>
    );
  }
}
