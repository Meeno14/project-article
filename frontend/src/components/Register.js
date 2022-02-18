import React, { Component } from "react";
import "./login.css";
import axios from "axios";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user"))) {
      window.location.href = "/";
    }
  }
  register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/auth/signup", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        role: "user",
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        window.location.href = "/login";
      });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="body"></div>
            <div className="grad"></div>
            <div className="header">
              <div style={{ marginLeft: "-20px" }}>
                Register<span>Form</span>
              </div>
            </div>
            <br />
            <form className="register" onSubmit={this.register}>
              <input
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                type="text"
                placeholder="Username"
                name="user"
                required
              />
              <br />
              <input
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                placeholder="Email"
                name="email"
                required
              />
              <br />
              <input
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <br />
              <button type="submit">Create Account</button>
              <p className="text-center text-white" style={{ width: "250px" }}>
                Sudah punya akun?{" "}
                <a href="/login" className="registeracc">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
