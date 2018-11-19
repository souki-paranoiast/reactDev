import React, { Component } from "react";

class SoTableRow extends Component {
  static newDto(key, style, cells, f) {
    let dto = {
      key: key,
      style: style,
      part: false,
      cells: cells
    };
    if (f == null) {
      dto._f = e => {
        return () => <SoTableRow key={key} value={e} />;
      };
    } else {
      dto._f = f;
    }
    return dto;
  }

  render() {
    return (
      <tr style={this.props.value.style}>
        {this.props.value.cells.map(e => e.newReactComponent())}
      </tr>
    );
  }
}

export default SoTableRow;
