import React from "react";
import SoComponent from "../base/SoComponent";

class SoImage extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, true, e => (
      <SoImage key={e.key} value={e} />
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
        const method = "GET";
        const body = Object.keys(obj)
          .map(key => key + "=" + encodeURIComponent(obj[key]))
          .join("&");
        const headers = {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        };
        fetch(e.api, { method, headers })
          .then(res => res.text())
          .then(console.log)
          .catch(console.error);
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
