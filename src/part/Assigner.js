import React, { Component } from "react";

class Assigner extends Component {
  constructor(props) {
    super(props);
    this.bindF = this.props.value.bindF;
    this.change = this.change.bind(this);
  }

  change(event) {
    this.bindF(event);
  }

  render() {
    return (
      <div>
        <textarea
          className="hogehoge"
          style={{ width: "600px", height: "600px" }}
        />
        <button onClick={this.change}>追記する</button>
      </div>
    );
  }
}

export default Assigner;
