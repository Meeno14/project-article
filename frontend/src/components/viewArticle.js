import React, { Component } from "react";

export class viewArticle extends Component {
  render() {
    const { title, image, content } = this.props.site;
    return (
      <div>
        <h1 className="text-center mb-2">{title}</h1>
        <img src={"http://localhost:3000/assets/" + image}
          className="image-header" alt="Header_Image" />
        <p>
          {content}
        </p>
      </div>
    );
  }
}

export default viewArticle;
