import React, { Component } from "react";
import Util from "../util/util";

class SoSubWindow extends Component {
  static newDto(key, label, height, width, top, left, childs, f) {
    let dto = {
      key: key,
      part: false,
      label: label,
      height: height,
      width: width,
      top: top,
      left: left,
      childs: childs
    };
    if (f == null) {
      dto._f = e => <SoSubWindow key={e.key} value={e} />;
    } else {
      dto._f = f;
    }
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
      absoluteTop: undefined
    };
    this.eventOuterCSS = this.eventOuterCSS.bind(this);
    this.outerCSS = this.outerCSS.bind(this);
    this.innerCSS = this.mainContentCSS.bind(this);
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
    // this.observ = this.observ.bind(this);
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

  closeStyle() {
    return {
      height: "20px", // == outerCSS
      float: "right",
      marginRight: "4px",
      inlineHeight: "10px",
      fontSize: "22px",
      marginTop: "-6px",
      cursor: "pointer"
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
    // this.setState(prevState => { // この形にしなくても差分で更新してくれるっぽい
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

  // resize
  windowResizeMouseDonw(event) {
    this.setState({
      windowResizing: true
    });
  }

  windowResizeMouseMove(event) {
    if (!this.state.windowResizing) {
      return;
    }
    // this.setState({
    //   width: Util.purePx(event.pageX) - this.state.left,
    //   height: Util.purePx(event.pageY) - this.state.top
    // });
    let style = event.currentTarget.style;
    this.setState({
      width: Util.purePxInt(style.width) + 40,
      height: Util.purePxInt(style.height) + 60
    });
  }

  windowResizeMouseUp(event) {
    if (!this.state.windowResizing) {
      return;
    }
    this.setState({
      windowResizing: false
    });
  }

  windowResizeMouseLeave(event) {
    // this.windowResizeMouseUp(event);
    this.windowResizeMouseMove(event);
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

  // やり方がわるいんだろうけどめちゃくちゃ遅い ※ resizeのイベントを拾うには、こういう監視の方法か、mousemoveしかないらしい。onResizeはwindowとか用らしい..
  //   observ(element) {
  //     if (!element) {
  //       return;
  //     }
  //     let observer = new MutationObserver(mutations => {
  //       mutations.forEach(mutation => {
  //         this.setState({
  //           width: mutation.target.width,
  //           height: mutation.target.height
  //         });
  //       });
  //     });
  //     observer.observe(element, { attributes: true });
  //   }

  // ReactではCSSもJSで書くスタイルで良いんじゃないかって考え方があるらしい https://qiita.com/koba04/items/0e81a04262e1158dbbe4
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
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        />
        <div
          style={this.outerCSS()}
          onMouseDown={this.windowMoveMouseDonw}
          onMouseMove={this.windowMoveMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          <span>{this.props.value.label}</span>
          <span style={this.closeStyle()} onClick={this.closeClick}>
            ×
          </span>
        </div>
        <div
          //   ref={element => this.observ(element)}
          style={this.mainContentCSS()}
          onMouseDown={this.windowResizeMouseDonw}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        >
          {this.props.value.childs.map(e => e.newReactComponent())}
        </div>
      </div>
    );
  }
}

export default SoSubWindow;
