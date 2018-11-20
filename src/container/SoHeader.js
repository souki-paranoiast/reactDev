import React from "react";
import SoComponent from "../base/SoComponent";

class SoHeader extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, e => (
      <SoHeader key={e.key} value={e} />
    ));
    dto.style = obj.style;
    dto.label = obj.label;
    dto.childs = obj.childs;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <div style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        {this.props.value.childs.map(e => e.newReactComponent())}
      </div>
    );
  }
}

export default SoHeader;
