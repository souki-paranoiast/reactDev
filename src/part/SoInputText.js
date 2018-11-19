import React, { Component } from "react";

class SoInputText extends Component {
  static newDto(key, type, format, length, label, value, f) {
    let dto = {
      key: key,
      part: true,
      type: type,
      format: format,
      length: length,
      label: label,
      value: value
    };
    if (f == null) {
      dto._f = e => <SoInputText key={e.key} value={e} />;
    } else {
      dto._f = f;
    }
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

  labelVDOM(v) {
    if (v.label == null || (v.label.length && v.label.length === 0)) {
      return null;
    }
    return <span style={this.props.ls}>{v.label}</span>; // ls == LabelStyle
  }

  change(event) {
    this.bindF(event);
  }

  render() {
    return (
      <span>
        {this.labelVDOM(this.props.value)}
        <input
          type="text"
          onChange={this.change}
          value={this.state.value}
          style={this.props.is} // is == InputStyle
        />
      </span>
    );
  }
}

export default SoInputText;
