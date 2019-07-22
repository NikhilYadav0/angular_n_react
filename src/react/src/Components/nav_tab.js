import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Tabs, Tab } from "react-bootstrap";
import Wall from "./wall";
import NoticeBoardLayout from "./noticeboard_layout";
import LearnLayout from "./learn_card_layout";
import DoubtForum from "../../Layout";
export default class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: "Wall",
      width: 100
    };
  }
  render() {
    return (
      <div>
        <Tabs
          id="nav-tabs"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="Learn" title="Learn" disable="true">
            {this.state.key === "Learn" ? <LearnLayout /> : null}
          </Tab>
          <Tab eventKey="Wall" title="Wall" key="Wall">
            {this.state.key === "Wall" ? <Wall /> : null}
          </Tab>
          <Tab eventKey="NoticeBoard" title="NoticeBoard">
            {this.state.key === "NoticeBoard" ? <NoticeBoardLayout /> : null}
          </Tab>
          <Tab eventKey="DoubtForum" title="DoubtForum">
            {this.state.key === "DoubtForum" ? <DoubtForum /> : null}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
