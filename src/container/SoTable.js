import React from "react";
import SoComponent from "../base/SoComponent";

/**
 * テーブル（枠）レイアウト
 */
class SoTable extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, (e, args) => (
      <SoTable key={e.key} value={e} args={args} />
    ));
    dto.style = obj.style;
    dto.headerRow = obj.headerRow;
    dto.detailRows = obj.detailRows;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  head() {
    if (!this.props.headerRow) {
      return null;
    }
    return <thead>{this.props.value.headerRow.newReactComponent(this.props.args)}</thead>;
  }

  render() {
    return (
      <table style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        {this.head()}
        <tbody>
          {this.props.value.detailRows.map(e => e.newReactComponent(this.props.args))}
        </tbody>
      </table>
    );
  }
}

export default SoTable;
