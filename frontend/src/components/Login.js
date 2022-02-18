import React, { Component } from "react";
import axios from "axios";
import "./login.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/auth/signin", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href = "/";
        } else alert(res.data.message);
        return res.data;
      });
  };

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user"))) {
      window.location.href = "/";
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="body"></div>
            <div className="grad"></div>
            <div className="header">
              <div>
                Login<span>Form</span>
              </div>
            </div>
            <br />
            <form className="login" onSubmit={this.login}>
              <input
                type="text"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                placeholder="Username"
                name="user"
              />
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
                name="password"
              />
              <br />
              <input type="button" value="Login" onClick={this.login} />
              <p className="text-center text-white" style={{ width: "250px" }}>
                belum punya akun?{" "}
                <a href="/register" className="registeracc">
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
