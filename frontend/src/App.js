import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import NavbarCm from "./components/NavbarCm";
import Footer from "./components/footer";
import Create from "./components/CreateSite";
import ViewArticle from "./components/viewArticle";
import axios from "axios";
import { API_URL } from "./services/utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "crud/get").then((res) => {
      this.setState({ sites: res.data });
    });
  }
  render() {
    console.log(this.state.sites);
    const routes = [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create", element: <Create /> },
    ];
    return (
      <BrowserRouter>
        <NavbarCm />
        <div className="container py-5 my-5">
          {/* <Home /> */}
          <Routes>
            {this.state.sites.map((site) => (
              <Route
                path={`/article/${site.id}`}
                key={site.id}
                element={<ViewArticle site={site} />}
              />
            ))}
            {routes.map((route, index) => (
              <Route path={route.path} key={index} element={route.element} />
            ))}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
