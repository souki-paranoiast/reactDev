import React from "react";
import SoComponent from "../base/SoComponent";

/**
 * テーブル行レイアウト
 */
class SoTableRow extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, (e, args) => (
      <SoTableRow key={e.key} value={e} args={args} />
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
        {this.props.value.cells.map(e => e.newReactComponent(this.props.args))}
      </tr>
    );
  }
}

export default SoTableRow;
