import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import DateModiier from "./FormattingHelpers/month";
import ApiCall from "./api_calls";
import "./FormattingHelpers/Css_Folder/noticeboard_layout.css";

export default class Annoncement extends React.Component {
  state = { Notices: [], page: 1 };
  update = false;
  constructor(props) {
    super(props);
    window.addEventListener("scroll", this.handleOnScroll);
  }
  loadMoreNotice(loadMore) {
    if (window.localStorage.hasOwnProperty("Notices") && !loadMore) {
      this.setState({
        Notices: JSON.parse(window.localStorage.getItem("Notices"))
      });
      this.update = false;
    } else {
      var page = this.state.page;
      if (loadMore) page++;
      ApiCall.loadNoticeBoardData(page, 10).then(response => {
        if (!window.localStorage.hasOwnProperty("Notices"))
          window.localStorage.setItem(
            "Notices",
            JSON.stringify(response.data.message)
          );
        console.log(response.data.message);
        var notices = this.state.Notices;
        notices = notices.concat(response.data.message);
        this.setState({ Notices: notices, page }, () => (this.update = false));
      });
    }
  }
  componentWillMount() {
    this.loadMoreNotice(false);
  }

  AttachedMaterial = item => {
    console.log(item);
    var base_url = "https://d1l59jsi25mzk9.cloudfront.net/Events/";
    if (item.messageAssets === null) return null;
    var assets = item.messageAssets.assets.map((item, index) => {
      if (item.fileType === "image") {
        return (
          <img
            key={`${index}`}
            className="image"
            src={`${base_url + item.systemFilename}`}
          />
        );
      }
      return null;
    });
    return (
      <div style={{ flexDirection: "row", flexWrap: "wrap" }}>{assets}</div>
    );
  };
  NoticesView = () => {
    var noticeView = this.state.Notices.map((item, index) => {
      var DateMonth = DateModiier(item.created);
      var date = DateMonth.date,
        month = DateMonth.month;
      return (
        <div key={`${index}`}>
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 1,
              marginBottom: 10
            }}
          >
            {date} {month}
          </div>
          <br />
          <div style={{ borderWidth: 1, margin: 5, borderColor: "#414141" }}>
            <div
              style={{
                marginTop: -25,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  margin: 10,
                  padding: 5,
                  color: "#ffffff",
                  backgroundColor: "#5e5e5e"
                }}
              >
                <FontAwesomeIcon
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                    backgroundColor: "#5e5e5e"
                  }}
                  icon={faBullhorn}
                  color="#ffffff"
                />
                {item.type.toUpperCase()}
              </div>
            </div>
            <div className="TextStyle title">{item.title}</div>
            <div className="TextStyle">
              {item.postedByName}, {item.created}
            </div>
            {item.messageAssets != null ? (
              <img
                style={{ height: 20, width: 20 }}
                src={item.messageAssets.assets[2]}
              />
            ) : null}
            {this.AttachedMaterial(item)}
          </div>
        </div>
      );
    });
    return noticeView;
  };

  handleOnScroll = event => {
    if (
      (window.pageYOffset * 1.0) / parseFloat(document.body.scrollHeight) >
        0.5 &&
      !this.update
    ) {
      console.log("loadTime");
      this.update = true;
      this.loadMoreNotice(true);
    }
  };
  render() {
    if (this.state.Notices.length == 0) return null;
    return (
      <div>
        <Card style={{ marginTop: -10 }}>
          <this.NoticesView />
        </Card>
      </div>
    );
  }
}
