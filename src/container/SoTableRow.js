import React from "react";
import SoComponent from "../base/SoComponent";

class SoTableRow extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, e => (
      <SoTableRow key={e.key} value={e} />
    ));
    dto.style = obj.style;
    dto.cells = obj.cells;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <tr style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        {this.props.value.cells.map(e => e.newReactComponent())}
      </tr>
    );
  }
}

export default SoTableRow;
