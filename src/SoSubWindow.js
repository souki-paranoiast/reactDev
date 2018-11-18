import React, { Component } from 'react';
import SoInputText from './part/SoInputText';
import Util from './util/util';

class SoSubWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            windowMoving: false,
            windowResizing: false,
            height: 220,
            width: 820,
            top: 50,
            left: 50,
            defaultTop: undefined,
            defaultLeft: undefined,
            absoluteLeft: undefined,
            absoluteTop: undefined,
        };
        this.eventOuterCSS = this.eventOuterCSS.bind(this);
        this.eventInnerCSS = this.eventInnerCSS.bind(this);
        this.outerCSS = this.outerCSS.bind(this);
        this.innerCSS = this.innerCSS.bind(this);
        this.closeClick = this.closeClick.bind(this);
        this.windowMoveMouseDonw = this.windowMoveMouseDonw.bind(this);
        this.windowMoveMouseMove = this.windowMoveMouseMove.bind(this);
        this.windowMoveMouseUp = this.windowMoveMouseUp.bind(this);
        this.windowMoveMouseLeave = this.windowMoveMouseLeave.bind(this);
        this.windowResizeMouseDonw = this.windowResizeMouseDonw.bind(this);
        this.windowResizeMouseMove = this.windowResizeMouseMove.bind(this);
        this.windowResizeMouseUp = this.windowResizeMouseUp.bind(this);
        this.windowResizeMouseLeave = this.windowResizeMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    newVDOM(element) {
        switch (element.type) {
            case "input":
                return (<SoInputText key={element.key} value={element} style={{ background: "rgba(255, 255, 255, 0,5) " }} />);
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

    // 意味のあるコンテンツの疑似的な外側（opacityの関係やイベント処理の関係から作成
    eventOuterCSS() {
        return {
            height: `${this.state.height}px`,
            width: `${this.state.width}px`,
            position: "absolute",
            top: `${this.state.top}px`,
            left: `${this.state.left}px`,
            opacity: 0.2
        };
    }
    eventInnerCSS() {
        return {
            height: `${this.state.height - 30}px`,
            width: `${this.state.width - 30}px`,
            position: "absolute",
            top: "15px",
            left: "15px",
            cursor: "nesw-resize",
            backgroundColor: "red"
        };
    }

    outerCSS() {
        return {
            height: `${this.state.height - 40}px`,
            width: `${this.state.width - 40}px`,
            backgroundColor: "#EECF51",
            position: "absolute",
            top: `${this.state.top + 20}px`,
            left: `${this.state.left + 20}px`,
            cursor: "move",
        };
    }

    innerCSS() {
        return {
            height: `${this.state.height - 60}px`,
            width: `${this.state.width - 40}px`,
            backgroundColor: "#FFFDFC",
            position: "absolute",
            top: `${this.state.top + 40}px`,
            left: `${this.state.left + 20}px`,
        };
    }

    closeStyle() {
        return {
            height: "20px", // == outerCSS
            float: "right",
            marginRight: "4px",
            inlineHeight: "10px",
            fontSize: "22px",
            marginTop: "-6px",
            cursor: "pointer",
        };
    }


    closeClick() {
        this.setState({ hidden: true });
    }

    // move
    windowMoveMouseDonw(event) {
        // 移動バーの中で、LeftTopの絶対値を保持して、そこを移動起点とする
        let al = event.pageX;
        let at = event.pageY;
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.windowMoving = true;
            s.absoluteLeft = Util.purePx(al);
            s.absoluteTop = Util.purePx(at);
            s.defaultLeft = prevState.left;
            s.defaultTop = prevState.top;
            return s;
        });
    }

    windowMoveMouseMove(event) {
        if (!this.state.windowMoving) {
            return;
        }
        let al = event.pageX;
        let at = event.pageY;
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.left = Util.purePx(al) - s.absoluteLeft + s.defaultLeft;
            s.top = Util.purePx(at) - s.absoluteTop + s.defaultTop;
            return s;
        });
    }

    windowMoveMouseUp(event) {
        if (!this.state.windowMoving) {
            return;
        }
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.windowMoving = false;
            return s;
        });
    }

    windowMoveMouseLeave(event) {
        // レンダリングが間に合わずにフォーカスが離れた場合変な挙動になるので、イベントを終了させる
        this.windowMoveMouseUp(event);
    }


    // resize
    windowResizeMouseDonw(event) {
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.windowResizing = true;
            s.defaultWidth = prevState.width;
            s.defaultHeight = prevState.height;
            return s;
        });
    }

    windowResizeMouseMove(event) {
        if (!this.state.windowResizing) {
            return;
        }
        let al = event.pageX;
        let at = event.pageY;
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.width = Util.purePx(al) - s.left;
            s.height = Util.purePx(at) - s.top;
            return s;
        });
    }

    windowResizeMouseUp(event) {
        if (!this.state.windowResizing) {
            return;
        }
        this.setState((prevState) => {
            let s = Object.assign({}, prevState);
            s.windowResizing = false;
            return s;
        });
    }

    windowResizeMouseLeave(event) {
        this.windowResizeMouseUp(event);
    }

    // event compose （共通的に拾わないといけないので合成
    handleMouseMove(event) {
        this.windowMoveMouseMove(event);
        this.windowResizeMouseMove(event);
    }
    handleMouseUp(event) {
        this.windowMoveMouseUp(event);
        this.windowResizeMouseUp(event);
    }
    handleMouseLeave(event) {
        this.windowMoveMouseLeave(event);
        this.windowResizeMouseLeave(event);
    }

    // ReactではCSSもJSで書くスタイルで良いんじゃないかって考え方があるらしい https://qiita.com/koba04/items/0e81a04262e1158dbbe4
    // 親のopacityは子に全て適用されてしまうらしい。background: rgbaで対応する方法もあるらしいが、少し用途と違ったのでこんな形で。
    // eventOuterCSSを作ったのは、これがあればHTMLのBodyにイベントを設定しなくても拾えるようになるのでは？という意図から
    render() {
        if (!!this.state.hidden) {
            return null;
        }
        return (
            <div>
                <div style={this.eventOuterCSS()} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp} onMouseLeave={this.handleMouseLeave}>
                    <div style={this.eventInnerCSS()} onMouseDown={this.windowResizeMouseDonw}></div>
                </div>
                <div style={this.outerCSS()} onMouseDown={this.windowMoveMouseDonw} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                    <span style={this.closeStyle()} onClick={this.closeClick}>×</span>
                </div>
                <div style={this.innerCSS()} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
                    {
                        this.props.value.map(e => this.newVDOM(e))
                    }
                </div>
            </div>
        );
    }
}

export default SoSubWindow;