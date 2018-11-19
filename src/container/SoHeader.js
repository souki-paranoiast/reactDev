import React, { Component } from "react";

class SoHeader extends Component {
  static newDto(key, label, height, width, childs, f) {
    let dto = {
      key: key,
      part: false,
      label: label,
      height: height,
      width: width,
      childs: childs
    };
    if (f == null) {
      dto._f = e => <SoHeader key={e.key} value={e} />;
    } else {
      dto._f = f;
    }
    return dto;
  }

  render() {
    return <div>{this.props.value.childs.map(e => e.newReactComponent())}</div>;
  }
}

export default SoHeader;
