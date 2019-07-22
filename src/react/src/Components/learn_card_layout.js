import React from "react";
import { Card, Image } from "react-bootstrap";
import ApiCall from "./api_calls";
import { Link } from "react-router-dom";
import "./FormattingHelpers/Css_Folder/learn_card_layout.css";

export default class LearnCardLayout extends React.Component {
  state = { item: null, result: null };
  loadCategoryList = () => {
    ApiCall.loadSchoolSpecific(21409234).then(response => {
      this.setState({ item: response.data });
    });
    ApiCall.getCategoryList().then(response => {
      this.setState({ result: response.data.result });
    });
  };
  componentDidMount() {
    //TODO: check on android
    if (window.localStorage.hasOwnProperty("LearnCards")) {
      console.log("from local storage");
      var ob = JSON.parse(window.localStorage.getItem("LearnCards"));
      this.setState(ob);
    } else {
      console.log("helllllo");
      ApiCall.loadSchoolSpecific(21409234)
        .then(response => {
          window.localStorage.setItem(
            "LearnCards",
            JSON.stringify({
              item: response.data,
              result: this.state.result
            })
          );
          this.setState({ item: response.data });
        })
        .catch(err => {
          console.log(err);
        });
      ApiCall.getCategoryList().then(response => {
        window.localStorage.setItem(
          "LearnCards",
          JSON.stringify({
            item: this.state.item,
            result: response.data.result
          })
        );
        this.setState({ result: response.data.result });
      });
    }
  }
  render() {
    var item = this.state.item;
    var result = this.state.result;
    return (
      <div>
        {result !== null && item !== null ? (
          <div
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <Link to={{ pathname: "home/learn-explore" }}>
              <span className="card" style={{ maxWidth: 350 }}>
                <Image
                  className="image"
                  src={`https://d1l59jsi25mzk9.cloudfront.net/${
                    result[0].image
                  }`}
                />
                <span className="title">{result[0].name}</span>
                <span className="title">{result[0].description}</span>
              </span>
            </Link>
            <span className="card" style={{ maxWidth: 350 }}>
              <Image
                className="image"
                src={`https://d1l59jsi25mzk9.cloudfront.net/${result[1].image}`}
              />
              <span style={{ justifyContent: "center" }}>
                <span className="title">{result[1].name}</span>
                <span className="title">{result[1].description}</span>
              </span>
            </span>
            <span className="card" style={{ maxWidth: 350 }}>
              <Image className="image" src={`${item.services[0].image}`} />
              <span style={{ justifyContent: "center" }}>
                <span className="title">{item.services[0].name}</span>
                <span className="title">{item.services[0].description}</span>
              </span>
            </span>
          </div>
        ) : (
          <div>Not Able To Load .... Try Again :/</div>
        )}
      </div>
    );
  }
}
