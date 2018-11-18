import React, { Component } from 'react';
import SoInputText from './part/SoInputText';

class SoHeader extends Component {

    newVDOM(element) {
        switch (element.type) {
            case "input":
                return (<SoInputText key={element.key} value={element} />);
            case "label":
                throw new Error(`not supported element type = ${element.type}`);
            case "select":
                throw new Error(`not supported element type = ${element.type}`);
            case "radio":
                throw new Error(`not supported element type = ${element.type}`);
            default:
                throw new Error(`not supported element type = ${element.type}`);
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.value.map(e => this.newVDOM(e))
                }
            </div>
        );
    }
}

export default SoHeader;