import React from "react";
import SoComponent from "../base/SoComponent";

/**
 * 縦方向レイアウト
 */
class SoYAxis extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, (e, args) => (
      <SoYAxis key={e.key} value={e} args={args} />
    ));
    dto.style = obj.style;
    dto.label = obj.label;
    dto.children = obj.children;
    return dto;
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <div style={this.patchStyle(this.props.value.style, this.defaultStyle)}>
        {this.props.value.children.map(e => e.newReactComponent(this.props.args))}
      </div>
    );
  }
}

export default SoYAxis;
