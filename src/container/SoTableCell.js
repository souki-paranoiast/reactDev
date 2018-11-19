import React, { Component } from "react";

class SoTableCell extends Component {
  static newDto(key, value, style, f) {
    let dto = {
      key: key,
      part: true,
      value: value,
      style: style
    };
    if (f == null) {
      dto._f = e => {
        return () => <SoTableCell key={key} value={e} />;
      };
    } else {
      dto._f = f;
    }
    return dto;
  }

  render() {
    return <td style={this.props.value.style}>{this.props.value.value}</td>;
  }
}

export default SoTableCell;
