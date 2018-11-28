import React from "react";
import SoComponent from "../base/SoComponent";

/**
 * テーブルCellレイアウト
 */
class SoTableCell extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, (e, args) => (
      <SoTableCell key={e.key} value={e} args={args} />
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
        {this.props.value.child.newReactComponent(this.props.args)}
      </td>
    );
  }
}

export default SoTableCell;
