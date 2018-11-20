import React from "react";
import SoComponent from "../base/SoComponent";

class SoInputText extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, true, e => (
      <SoInputText key={e.key} value={e} />
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
    return {};
  }

  change(event) {
    this.bindF(event);
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.change}
        value={this.state.value}
        style={this.patchStyle(this.props.value.style, this.defaultStyle)}
      />
    );
  }
}

export default SoInputText;
