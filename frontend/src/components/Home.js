import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { API_URL } from "../services/utils";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      sites: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "crud/get").then((res) => {
      this.setState({ sites: res.data, loading: false });
    });
    this.setState({ user: JSON.parse(localStorage.getItem("user")) })
  }

  render() {
    return (
      <Row xs={2} md={3}>
        {this.state.sites.map((site, index) => (
          <Col key={index}>
            <Card>
              <Card.Img
                variant="top"
                style={{ height: "200px", objectFit: "cover" }}
                src={"assets/" + site.image}
              />
              <Card.Body>
                <Card.Title
                  style={{ WebkitLineClamp: "1" }}
                  className="text-overflow"
                >
                  {site.title}
                </Card.Title>
                <Card.Text
                  style={{ WebkitLineClamp: "2" }}
                  className="text-overflow"
                >
                  {site.content}
                </Card.Text>
                <a href={"/article/" + site.id}><Button>Baca</Button></a>
                {this.state.user && this.state.user.role === "admin" && (
                  <a href={"/edit/" + site.id}><Button variant="warning">Edit</Button></a>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Home;
