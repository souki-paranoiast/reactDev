import React from "react";
import SoComponent from "../base/SoComponent";
import Util from "../util/Util";

// 必要であればstyleを全面的に引数から持ってくるけど、、

class SoSubWindow extends SoComponent {
  static newDto(obj) {
    let dto = SoComponent.baseDto(obj.key, false, (e, args) => (
      <SoSubWindow key={e.key} value={e} args={args} />
    ));
    const style = obj.style || {};
    dto.label = obj.label;
    dto.height = Util.purePxInt(style.height);
    dto.width = Util.purePxInt(style.width);
    dto.top = Util.purePxInt(style.top);
    dto.left = Util.purePxInt(style.left);
    dto.children = obj.children;
    return dto;
  }

  constructor(props) {
    super(props);
    const v = this.props.value;
    this.state = {
      hidden: false,
      windowMoving: false,
      windowResizing: false,
      height: v.height,
      width: v.width,
      top: v.top,
      left: v.left,
      defaultTop: undefined,
      defaultLeft: undefined,
      absoluteLeft: undefined,
      absoluteTop: undefined,
      rem: 0
    };
    this.eventOuterCSS = this.eventOuterCSS.bind(this);
    this.outerCSS = this.outerCSS.bind(this);
    this.innerCSS = this.mainContentCSS.bind(this);
    this.remIncrementClick = this.remIncrementClick.bind(this);
    this.closeClick = this.closeClick.bind(this);
    this.windowMoveMouseDonw = this.windowMoveMouseDonw.bind(this);
    this.windowMoveMouseMove = this.windowMoveMouseMove.bind(this);
    this.windowMoveMouseUp = this.windowMoveMouseUp.bind(this);
    this.windowMoveMouseLeave = this.windowMoveMouseLeave.bind(this);
    this.observeTarget = React.createRef();
  }

  componentDidMount() {
    const observer = new MutationObserver((mutationRecords, thisObserver) => {
      this.setState((prevState) => {
        const c = this.observeTarget.current;
        let s = Object.assign({}, prevState);
        s.width = Util.purePxInt(c.style.width) + 40;
        s.height = Util.purePxInt(c.style.height) + 60;
        return s;
      });
    });
    const target = this.observeTarget.current;
    // https://qiita.com/MysticDoll/items/7b2654b7a8b58d773286
    const options = {
      attriblutes: true,
      attributeFilter: ["style"]
    };
    observer.observe(target, options);
  }

  // 意味のあるコンテンツの疑似的な外側（opacityの関係やイベント処理の関係から作成
  eventOuterCSS() {
    return {
      height: `${this.state.height}px`,
      width: `${this.state.width}px`,
      position: "absolute",
      top: `${this.state.top}px`,
      left: `${this.state.left}px`,
      opacity: 0.0
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
      cursor: "move"
    };
  }

  mainContentCSS() {
    return {
      height: `${this.state.height - 60}px`,
      width: `${this.state.width - 40}px`,
      backgroundColor: "#FFFDFC",
      position: "absolute",
      top: `${this.state.top + 40}px`,
      left: `${this.state.left + 20}px`,
      resize: "both",
      overflow: "scroll"
    };
  }

  titleStyle() {
    return {
      color: "#393535",
      userSelect: "none"
    };
  }

  remIncrementStyle() {
    return {
      height: "20px", // == outerCSS
      cursor: "auto",
      userSelect: "none"
    };
  }

  closeStyle() {
    return {
      height: "20px", // == outerCSS
      float: "right",
      marginRight: "4px",
      fontSize: "22px",
      marginTop: "-6px",
      cursor: "pointer",
      userSelect: "none"
    };
  }

  remIncrementClick() {
    this.setState((prevState) => {
      const s = Object.assign({}, prevState);
      s.rem++;
      return s;
    });
  }

  closeClick() {
    this.setState({ hidden: true });
  }

  // move
  windowMoveMouseDonw(event) {
    // 移動バーの中で、LeftTopの絶対値を保持して、そこを移動起点とする
    let al = event.pageX;
    let at = event.pageY;
    // this.setState(prevState => { // この形にしなくても差分で更新してくれるっぽい？ 理解できていない
    //   let s = Object.assign({}, prevState);
    //   s.windowMoving = true;
    //   s.absoluteLeft = Util.purePx(al);
    //   s.absoluteTop = Util.purePx(at);
    //   s.defaultLeft = prevState.left;
    //   s.defaultTop = prevState.top;
    //   return s;
    // });
    this.setState({
      windowMoving: true,
      absoluteLeft: Util.purePx(al),
      absoluteTop: Util.purePx(at),
      defaultLeft: this.state.left,
      defaultTop: this.state.top
    });
  }

  windowMoveMouseMove(event) {
    if (!this.state.windowMoving) {
      return;
    }
    this.setState({
      left:
        Util.purePxInt(event.pageX) -
        this.state.absoluteLeft +
        this.state.defaultLeft,
      top:
        Util.purePxInt(event.pageY) -
        this.state.absoluteTop +
        this.state.defaultTop
    });
  }

  windowMoveMouseUp(event) {
    if (!this.state.windowMoving) {
      return;
    }
    this.setState({
      windowMoving: false
    });
  }

  windowMoveMouseLeave(event) {
    // レンダリングが間に合わずにフォーカスが離れた場合変な挙動になるので、イベントを終了させる
    // ⇒ leaveイベントが発生するのはイベントが発生したコンポーネントから離れたときらしく、外側でハンドリングできないっぽい。何か他に方法ありそうなもんだけど.. ひとまず強制レンダリングで対応
    // this.windowMoveMouseUp(event);
    this.windowMoveMouseMove(event);
  }

  // 親のopacityは子に全て適用されてしまうらしい。background: rgbaで対応する方法もあるらしいが、少し用途と違ったのでこんな形で。
  // eventOuterCSSを作ったのは、これがあればHTMLのBodyにイベントを設定しなくても拾えるようになるのでは？という意図から
  render() {
    if (!!this.state.hidden) {
      return null;
    }
    return (
      <div>
        <div
          style={this.eventOuterCSS()}
          onMouseMove={this.windowMoveMouseMove}
          onMouseUp={this.windowMoveMouseUp}
          onMouseLeave={this.windowMoveMouseLeave}
        />
        <div
          style={this.outerCSS()}
          onMouseDown={this.windowMoveMouseDonw}
          onMouseMove={this.windowMoveMouseMove}
          onMouseUp={this.windowMoveMouseUp}
        >
          <span style={this.titleStyle()}>{this.props.value.label}</span>
          <span style={this.remIncrementStyle()} onClick={this.remIncrementClick}>
            ＋
          </span>
          <span style={this.closeStyle()} onClick={this.closeClick}>
            ×
          </span>
        </div>
        <div
          style={this.mainContentCSS()}
          ref={this.observeTarget}
          onMouseMove={this.windowMoveMouseMove}
          onMouseUp={this.windowMoveMouseUp}
        >
          {this.props.value.children.map(e => e.newReactComponent(this.pushArgs(this.props.args, { rem: this.state.rem })))}
        </div>
      </div>
    );
  }
}

export default SoSubWindow;
