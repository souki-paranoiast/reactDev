import React from "react";
import SoComponent from "../base/SoComponent";

class SoTable extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, e => (
      <SoTable key={e.key} value={e} />
    ));
    dto.style = obj.style;
    dto.headerRow = obj.headerRow;
    dto.detailRows = obj.detailRows;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <table style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        <thead>{this.props.value.headerRow.newReactComponent()}</thead>
        <tbody>
          {this.props.value.detailRows.map(e => e.newReactComponent())}
        </tbody>
      </table>
    );
  }
}

export default SoTable;
