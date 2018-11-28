import React from "react";
import SoComponent from "../base/SoComponent";
import Api from "../util/Api";

class SoImage extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, true, (e, args) => (
      <SoImage key={e.key} value={e} args={args} />
    ));
    dto.style = obj.style;
    dto.src = obj.src;
    dto.alt = obj.alt;
    dto.evList = obj.evList;
    return dto;
  }

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }

  click(event) {
    const list = this.props.value.evList;
    for (const e of list) {
      if (e.type === "exec") {
        const obj = { body: "foo!!!" };
        Api.get(e.api, obj,
          (res) => res.text(),
          (v) => alert(v),
          (v) => alert(v)
        );
      }
    }
  }

  defaultStyle() {
    return {};
  }

  render() {
    return (
      <img
        style={this.patchStyle(this.props.value.style, this.defaultStyle)}
        src={this.props.value.src}
        alt={this.props.value.alt}
        onClick={this.click}
      />
    );
  }
}

export default SoImage;
