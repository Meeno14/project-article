import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { API_URL } from "../services/utils";
import axios from "axios";

export class CreateSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      preview: "",
      content: "",
    };
  }
  upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("image", this.state.image);
    formData.append("content", this.state.content);
    axios.post(API_URL + "crud/post", formData).then((res) => {
      alert(res.data.message);
    });
  };
  changeImage = (e) => {
    this.setState({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.upload}>
          <Form.Group className="mb-3">
            <Form.Label>Judul Artikel</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={(e) =>
                this.setState({
                  title: e.target.value,
                })
              }
              placeholder="Article Title"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={this.changeImage}
              size="sm"
              required
              id="uploadImage"
            />
            <Form.Label for="uploadImage" style={{ width: "100%" }}>
              <img
                className="image-header"
                id="preview"
                src={this.state.preview}
                alt="no image uploaded"
              />
            </Form.Label>
          </Form.Group>
          <Form.Group
            className="mb-3"
            value={this.state.content}
            onChange={(e) =>
              this.setState({
                content: e.target.value,
              })
            }
            required
          >
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={30} />
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
      </Container>
    );
  }
}

export default CreateSite;
