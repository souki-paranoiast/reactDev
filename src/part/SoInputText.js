import React from "react";
import SoComponent from "../base/SoComponent";
import Util from "../util/Util";

class SoInputText extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, true, (e, args) => (
      <SoInputText key={e.key} value={e} args={args} />
    ));
    dto.style = obj.style;
    dto.type = obj.type;
    dto.format = obj.format;
    dto.label = obj.label;
    dto.value = obj.value;
    dto.length = obj.length;
    return dto;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value.value
    };
    this.bindF = props.value.bindF;
    this.change = this.change.bind(this);
  }

  defaultStyle() {
    return {
      fontSize: "1rem"
    };
  }

  change(event) {
    this.bindF(event);
  }

  applyStyleArgs(style) {
    const ary = this.props.args;
    if (ary == null || ary.length === 0) {
      return style;
    }

    ary
      .filter(e => e != null && !!e.rem)
      .forEach(e => {
        style.fontSize = Util.incrementRem(style.fontSize, e.rem);
      });
    return style;
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.change}
        value={this.state.value}
        style={this.applyStyleArgs(this.patchStyle(this.props.value.style, this.defaultStyle))}
      />
    );
  }
}

export default SoInputText;
