import React, { Component } from 'react';

class SoInputText extends Component {

    static newDto(key, type, format, length, label, value) {
        return {
            key: key,
            type: type,
            format: format,
            length: length,
            label: label,
            value: value
        };
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
        return (<span>{v.label}</span>);
    }

    // setStateには第一引数にprevStateを取ることも可能
    change(event) {
        this.bindF(event);
    }

    render() {
        return (
            <span>
                {this.labelVDOM(this.props.value)}
                <input type="text" onChange={this.change} value={this.state.value} />
            </span>
        );
    }
}

export default SoInputText;