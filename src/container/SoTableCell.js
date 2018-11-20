import React from "react";
import SoComponent from "../base/SoComponent";

class SoTableCell extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, e => (
      <SoTableCell key={e.key} value={e} />
    ));
    dto.style = obj.style;
    dto.child = obj.child;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <td style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        {this.props.value.child.newReactComponent()}
      </td>
    );
  }
}

export default SoTableCell;
