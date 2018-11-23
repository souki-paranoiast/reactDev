import React, { Component } from "react";
import Assigner from "./part/Assigner";
import ComponentHelper from "./base/ComponentHelper";
import Util from "./util/util";

class App extends Component {
  constructor(props) {
    super(props);

    // styleとかの情報はこいつ自身がstateに持たなくても良いかも？ 多分ここまでネストさせてると、どうせ再描画の命令は各コンポーネント自身で動かさないと発火しないはずだし。。。
    // 動作が遅くなって、改善の余地があるならテストしてみること
    const json = {
      subWindows: {
        x1: {
          clz: "SoSubWindow",
          key: "s-x1-key",
          style: { height: "220px", width: "820px", top: "50px", left: "50px" },
          label: "ほげほげ詳細ポップアップ",
          childs: [
            {
              clz: "SoImage",
              key: "s-x1-key-img1",
              style: { width: "200px", height: "200px" },
              src: "images/yaruki_moeru_businessman.png",
              alt: "やる気↑",
              evList: [
                {
                  type: "exec",
                  api: "json.html"
                }
              ]
            },
            {
              clz: "SoImage",
              key: "s-x1-key-img2",
              style: { width: "200px", height: "200px" },
              src: "images/yaruki_moetsuki_businessman.png",
              alt: "やる気↓",
              evList: [
                {
                  type: "exec",
                  api: "https://api.chatwork.com/v2/rooms/75778963/messages"
                }
              ]
            }
          ]
        }
      }
    };

    let obj = this._pureJsonToDto(json);
    this._fix(obj);
    this.state = obj;
    this.render = this.render.bind(this);
    this._ffff = this._ffff.bind(this);
  }

  /**
   * 破壊的変更。プレーンJSON（関数が存在しないとかそういう）で表現できるオブジェクトの引数を、内部で使用するインスタンスのプロパティにゴリゴリ変更する。
   * @param {object} obj
   */
  _convert(obj) {
    if (Util.isPrimitive(obj)) {
      return;
    }
    Object.keys(obj).forEach(e => {
      let element = obj[e];
      if (!!element && element.clz) {
        obj[e] = ComponentHelper.newDto(element);
      }
      if (!!element && !element._part) {
        this._convert(element);
      }
    });
  }

  /**
   * 非破壊的変更（のはず）。プレーンJSON（関数が存在しないとかそういう）で表現できるオブジェクトの引数を、内部で使用するインスタンスのプロパティ変換する
   * @param {object} obj
   */
  _pureJsonToDto(obj) {
    if (Util.isPrimitive(obj)) {
      return obj;
    }
    let o = obj;
    if (o.clz) {
      o = ComponentHelper.newDto(o);
    }
    if (!o._part) {
      this._convert(o);
    }
    return o;
  }

  /**
   * 破壊的変更。基本的なデータバインディング関数と描画関数の付与。それ以外にも足りないものを補完するイメージ
   * @param {object} obj
   */
  _fix(obj, keyAry = []) {
    if (Util.isPrimitive(obj)) {
      return obj;
    }
    if (obj._f) {
      obj.newReactComponent = () => obj._f(obj);
    }
    if (obj.type === "input") {
      obj.bindF = event => {
        let v = event.target.value;
        this.setState((prevState, currentProps) => {
          let newState = Object.assign({}, prevState);
          let s = newState;
          for (const key of keyAry) {
            s = s[key];
          }
          s.value = v;
          return newState;
        });
      };
    }
    Object.keys(obj).forEach(e => {
      let newKeyAry = keyAry.concat(e);
      let element = obj[e];
      if (element == null) {
        return;
      }
      if (!element.part) {
        return this._fix(element, newKeyAry);
      }
    });
    return obj;
  }

  render() {
    return (
      <div className="App">
        {Object.keys(this.state).flatMap(topKey => {
          const o = this.state[topKey];
          return Object.keys(o).map(e => {
            return o[e].newReactComponent();
          });
        })}
        {/* ↓はテスト用。実際はAjaxか他Componentから値を突っ込むイメージになる */}
        {
          //   <div>
          //   <textarea style={{ width: "600px", height: "600px" }}>
          //     {JSON.stringify(this.state)}
          //   </textarea>
          //   <Assigner value={{ bindF: this._ffff }} />
          // </div>
        }
      </div>
    );
  }

  _ffff(event) {
    let json = JSON.parse(
      document.getElementsByClassName("assginJson")[0].value
    );
    const keys = document.getElementsByClassName("assignObjectKey")[0].value;
    let obj = this._pureJsonToDto(json);
    this._fix(obj);
    this.setState(prevState => {
      let newState = Object.assign({}, prevState);

      let nest = newState;
      let keyAry = keys.split("::");
      for (let i = 0, ignoreLast = keyAry.length - 1; i < ignoreLast; i++) {
        nest = nest[keyAry[i]];
      }
      nest[keyAry[keyAry.length - 1]] = obj;
      return newState;
    });
  }
}

export default App;
