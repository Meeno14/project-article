import React, { Component } from "react";

export class footer extends Component {
  render() {
    return (
      <footer className="bg-light text-center text-white">
        {/* <!-- Copyright --> */}
        <div className="text-center p-3" style={{ backgroundColor: "#a18d6c" }}>
          © 2022 Copyright:
          <span className="text-white">{ } RimTicle.io</span>
        </div>
      </footer>
    );
  }
}

export default footer;
