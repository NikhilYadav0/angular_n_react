import React from "react";
import ReactDOM from "react-dom";
import ApiCall from "./api_call";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
export default class Layout extends React.Component {
  update = false;
  constructor(props) {
    super(props);
    this.state = { message: [], page: 0 };
    window.addEventListener("scroll", this.handleOnScroll);
    this.loadDoubts(1);
  }
  loadDoubts = pageNum => {
    ApiCall.getDoubts(pageNum).then(response => {
      console.log(response);
      var doubts = this.state.message;
      doubts = doubts.concat(response.data.message);
      this.setState(
        {
          message: doubts,
          page: pageNum
        },
        () => {
          this.update = false;
        }
      );
    });
  };
  handleOnScroll = event => {
    if (window.pageYOffset / document.body.scrollHeight > 0.5 && !this.update) {
      console.log("loadTime");
      this.update = true;
      this.loadDoubts(this.state.page + 1);
    }
  };
  renderAssets = messageAssets => {
    if (messageAssets == null || messageAssets.assets == null) {
      return;
    }
    var assets = messageAssets.assets;
    console.log(assets);
    var assetsView = assets.map((asset, index) => {
      if (asset.fileType != "image") return null;
      return (
        <Card
          key={`${index}`}
          style={{ height: 200, width: 400, maxWidth: "90%" }}
        >
          <img
            style={{ height: 200, width: 400, maxWidth: "100%" }}
            src={`https://d1l59jsi25mzk9.cloudfront.net/${asset.url}`}
          />
        </Card>
      );
    });
    return <div>{assetsView}</div>;
  };
  renderDoubts = doubts => {
    var message = doubts.map((doubt, index) => {
      return (
        <Card key={`${index}`} style={{ padding: 5, marginBottom: 50 }}>
          <div>{doubt.messageText}</div>
          <div>,{doubt.postedByName}</div>
          <div>{doubt.displayTime}</div>
          <div>{doubt.role}</div>
          <div> {this.renderAssets(doubt.messageAssets)} </div>
          <hr />
          <div>
            {doubt.commentCount} Answers | {doubt.followCount} Followers
            <span style={{ position: "absolute", right: 10 }}>
              <a href="/">Details</a>
            </span>
          </div>
        </Card>
      );
    });
    return <div>{message}</div>;
  };
  render() {
    var message = this.state.message;
    return (
      <div>
        <ol
          className="breadcrumb margin-bottom-0"
          style={{
            position: "relative",
            backgroundColor: "rgba(0,0,0,0)",
            zIndex: "2000"
          }}
        >
          <li className="breadcrumb-item">
            <a ui-sref="wrv1_home" href="/">
              Home
            </a>
          </li>
          <li className="breadcrumb-item">Doubt Forum</li>
        </ol>
        <div style={{ margin: "5%" }}>{this.renderDoubts(message)}</div>
        <button
          style={{
            position: "fixed",
            padding: 20,
            bottom: 10,
            left: "45%",
            borderRadius: 25
          }}
          className="btn-primary"
        >
          Ask your Doubt >
        </button>
      </div>
    );
  }
}

// render(){
// 	return (
// 		<div>
// 			<hr />
// 			<h1>React TO-DO</h1>
// 			<ul>{this.props.todos.map((todo, key) => {
// 				return <li key={key} onClick={(event) => {
// 					this.props.markComplete(todo)
// 				}
// 				} className={["list-item", todo.done === true ? "done-true" : "done-false"].join(" ")}>{todo.text}
// 				</li>
// 			})
// 			}</ul>
// 			<button id="click" onClick={() => {
// 				this.props.newItem("Alter triggered from React but Fired from AngularJS")
// 			}
// 			}>Click to make Angular Alert!!</button>
// 		</div>
// 	);
// }
