import React, { Component } from "react";

class SoTable extends Component {
  static newDto(key, style, header, detailChilds, f) {
    let dto = {
      key: key,
      part: false,
      style: style,
      header: header,
      detailChilds: detailChilds
    };
    if (f == null) {
      dto._f = e => <SoTable key={e.key} value={e} />;
    } else {
      dto._f = f;
    }
    return dto;
  }

  render() {
    return (
      <table style={this.props.value.style}>
        <thead>{this.props.value.header.newReactComponent()}</thead>
        <tbody>
          {this.props.value.detailChilds.map(e => e.newReactComponent())}
        </tbody>
      </table>
    );
    //      return <div>{this.props.value.childs.map(e => e.newReactComponent())}</div>;
  }
}

export default SoTable;
