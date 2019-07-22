import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import ApiCall from "./api_calls";
import { Link } from "react-router-dom";
import "./FormattingHelpers/Css_Folder/learn_explore.css";
export default class LearnExplore extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], ind: -1 };
    ApiCall.loadSubChaps(309).then(response => {
      console.log(response);
    });
    ApiCall.loadSubjects().then(response => {
      console.log(response);
      this.setState({ data: response.data.response });
    });
    // ApiCall.loadSubChaps(309).then((response)=>{
    //     console.log(response.data)
    // })
  }
  SubjectItem = buttonTitle => {
    var iconUrl =
      "https://d1l59jsi25mzk9.cloudfront.net/" + buttonTitle.iconUrl;
    return (
      <div style={{ width: "30%" }}>
        <Link
          to={{
            pathname:
              "learn-book/339/Mathematics/Fliplearn~2FSubjects~2FMaths.svg/14/55/KG/CBSE/prime/fa9721//false"
          }}
        >
          <Button
            icon={
              <Image
                style={{ width: 30, height: 30, marginRight: 10 }}
                source={{ uri: iconUrl }}
              />
            }
            buttonStyle={{
              borderColor: `#${buttonTitle.colorCode}`,
              borderWidth: 2,
              borderLeftWidth: 10,
              borderRadius: 10
            }}
            style={{ margin: 10 }}
            title={buttonTitle.subjectName}
            type="outline"
          />
        </Link>
      </div>
    );
  };
  createManySunjects(subjects) {
    var listItems = subjects.map((item, ind) => {
      return this.SubjectItem(item);
    });
    return (
      <div style={{ flexDirection: "row", flexWrap: "wrap" }}>{listItems}</div>
    );
  }
  listView = ({ item, index }) => {
    return (
      <div>
        {index !== this.state.ind ? (
          <div
            onClick={() => {
              var subj = this.state.data;
              if (this.state.ind === index + 1) {
                subj.splice(index + 1, 1);
                this.setState({ data: subj, ind: -1 });
              } else {
                if (this.state.ind !== -1) {
                  subj.splice(this.state.ind, 1);
                }
                subj.splice(
                  index + 1,
                  0,
                  this.createManySunjects(this.state.data[index].subjects)
                );
                this.setState({ data: subj, ind: index + 1 });
              }
            }}
          >
            <div
              containerStyle={{
                shadowOffset: { width: "100%", height: "100%" }
              }}
              title={item.className}
              bottomDivider={true}
            />
          </div>
        ) : (
          <div>{item}</div>
        )}
      </div>
    );
  };
  renderList = () => {
    var views = this.state.data.map((value, index) => {
      return <div>{this.listView(value, index)}</div>;
    });
    return (
      <div style={{ width: "80%", borderWidth: 1, borderColor: "#c6d8e4" }}>
        {views}
      </div>
    );
  };

  render() {
    console.log(this.state.data);
    return (
      <div style={{ marginTop: 10 }}>
        <div
          className="title"
          style={[{ paddingLeft: "10%", marginBottom: 10 }]}
        >
          Select Class
        </div>
        <div style={{ alignItems: "center" }}>{this.renderList}</div>
      </div>
    );
  }
}
