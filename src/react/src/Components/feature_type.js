import React from "react";
import { Image } from "react-bootstrap";
import "./FormattingHelpers/Css_Folder/feature_type.css";

export default class featureType extends React.Component {
  render() {
    var item = this.props.item;
    if (item.featureAttachmentType === "image") {
      var image_url = `https://d1l59jsi25mzk9.cloudfront.net/${
        item.messageFeatureAssets.assets[0].url
      }`;
      return <img src={image_url} className="image" />;
    } else {
      var src = `https://www.youtube.com/embed/${item.featureAttachmentLink}`;
      var uri = encodeURI(src);
      return (
        <div>
          <iframe
            title="Video Player"
            src={src}
            style={{ height: 306, width: "100%", maxWidth: 450 }}
          />
        </div>
      );
    }
  }
}
