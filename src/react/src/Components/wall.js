import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import ApiCall from "./api_calls";
import VisualFeature from "./feature_type";
// import Comment from "./comment";
import Divider from "./divider";
import DateModiier from "./FormattingHelpers/month";
import { Card } from "react-bootstrap";
import "./FormattingHelpers/Css_Folder/wall.css";

export default class Wall extends Component {
  state = { userMessages: [], page: 1 };
  constructor(props) {
    super(props);
    window.onbeforeunload = function(e) {
      localStorage.clear();
    };
    window.addEventListener("scroll", this.handleOnScroll);
  }
  update = false;
  loadMoreComponent(loadMore) {
    if (!localStorage.hasOwnProperty("WallMessage") || loadMore) {
      var page = this.state.page;
      if (loadMore) page++;
      ApiCall.loadDataOnWall(page, 10).then(response => {
        if (page === 1) {
          localStorage.setItem(
            "WallMessage",
            JSON.stringify(response.data.message)
          );
        }
        var messages = this.state.userMessages;
        messages = messages.concat(response.data.message);
        this.setState({ userMessages: messages, page }, () => {
          this.update = false;
        });
      });
    } else {
      var storedUserMessages = JSON.parse(localStorage.getItem("WallMessage"));
      console.log(storedUserMessages);
      this.setState({ userMessages: storedUserMessages }, () => {
        this.update = false;
      });
    }
  }
  componentWillMount() {
    this.loadMoreComponent(false);
  }
  likeButton = i => {
    console.log("clicked");
    var message = this.state.userMessages;
    message[i].selfLiked = !message[i].selfLiked;
    if (message[i].selfLiked)
      ApiCall.likeMessage(`${101004608030}`, message[i].messageCode);
    else ApiCall.unlikeMessage(`${101004608030}`, message[i].messageCode);
    this.setState({ userMessages: message });
  };
  MessageList = () => {
    if (this.state.userMessages === null) return null;
    var messages = this.state.userMessages.map((item, index) => {
      var DateMonth = DateModiier(item.created);
      var date = DateMonth.date,
        month = DateMonth.month;
      // return (<Text> Hello!! </Text>)
      return (
        <div key={index}>
          <div
            className="title"
            style={{ display: "flex", justifyContent: "center", marginTop: 1 }}
          >
            {date} {month}
          </div>
          <Card style={{ margin: 0 }}>
            <div className="title"> {item.title}</div>
            <br />

            <VisualFeature item={item} />
            <br />
            <div>
              {item.messageText}
              <br />
              {item.likedCount} Likes | {item.comments[0].commentCount} Comments
            </div>
            <Divider />

            <div style={{ flex: 1, flexDirection: "row" }}>
              <div style={{ flex: 1, flexDirection: "row" }}>
                <FontAwesomeIcon
                  title="likeButtton"
                  icon={item.selfLiked ? filledHeart : emptyHeart}
                  style={item.selfLiked ? { color: "#FF0000" } : null}
                />

                <div
                  onClick={() => this.likeButton(index)}
                  className="title"
                  style={
                    { fontSize: 12 }
                    // { color: item.selfLiked ? "#FF0000" : "#000000" }
                  }
                >
                  {item.selfLiked ? "  Liked" : "  Like"}
                </div>
              </div>
              <div
                style={{ position: "absolute", right: 10, color: "#148bfe" }}
              >
                Watch more Videos -->
              </div>
            </div>
            {/* <Comment
              uuid={101004608030}
              comCount={item.comments[0].commentCount}
              messageCode={item.messageCode}
              item={item.comments[0].comment}
            /> */}
          </Card>
        </div>
      );
    });
    return (
      <div>
        {messages} <br />
      </div>
    );
  };

  handleOnScroll = event => {
    if (window.pageYOffset / document.body.scrollHeight > 0.5 && !this.update) {
      console.log("loadTime");
      this.update = true;
      this.loadMoreComponent(true);
    }
  };
  render() {
    if (this.state.userMessages.length == 0) return null;
    return (
      <div>
        <Card style={{ marginTop: 10 }}>
          <this.MessageList />
        </Card>
      </div>
    );
  }
}
