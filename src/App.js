import React, { Component } from "react";
import Assigner from "./part/Assigner";
import ComponentHelper from "./base/ComponentHelper";

class App extends Component {
  constructor(props) {
    super(props);

    const json = {
      subWindows: {
        x1: {
          clz: "SoSubWindow",
          key: "s-x1-key",
          style: { height: "220px", width: "820px", top: "50px", left: "50px" },
          label: "ほげほげ詳細ポップアップ",
          childs: [
            {
              clz: "SoInputText",
              key: "s-x1-key-date",
              style: "input",
              format: "date",
              length: 13,
              label: "日付",
              value: undefined
            },
            {
              clz: "SoSubWindow",
              key: "s-x1-key-nest1",
              style: {
                height: "220px",
                width: "820px",
                top: "50px",
                left: "50px"
              },
              label: "ほげほげ詳細ポップアップnest",
              childs: [
                {
                  clz: "SoInputText",
                  key: "s-x1-key-nest1-num",
                  style: null,
                  type: "input",
                  format: "number",
                  length: 13,
                  label: "総数量",
                  value: undefined
                }
              ]
            }
          ]
        }
      }
    };

    const obj = this.convert(json, []);
    this.state = this._fix(obj, []);
    this.render = this.render.bind(this);
    this._ffff = this._ffff.bind(this);
  }

  convert(json, keyAry) {
    if (
      json == null ||
      typeof json === "string" ||
      typeof json === "number" ||
      typeof json === "boolean"
    ) {
      // プリミティブの判断はこれでOK
      return json;
    }
    Object.keys(json).forEach(e => {
      let element = json[e];
      if (element == null) {
        return json;
      }
      if (element.clz) {
        let d = ComponentHelper.newDto(element);
        json[e] = d;
      }
      if (!element.part) {
        return this.convert(element);
      }
    });
    return json;
  }

  /**
   * @param {object} stateObj
   * @param {Array} keyAry
   */
  _fix(stateObj, keyAry) {
    if (
      stateObj == null ||
      typeof stateObj === "string" ||
      typeof stateObj === "number" ||
      typeof stateObj === "boolean"
    ) {
      // プリミティブの判断はこれでOK
      return stateObj;
    }

    Object.keys(stateObj).forEach(e => {
      let newKeyAry = keyAry.concat(e);
      let element = stateObj[e];
      if (element == null) {
        return;
      }
      if (element._f) {
        element.newReactComponent = () => element._f(element);
      }
      if (!element.part) {
        return this._fix(element, newKeyAry);
      }
      if (element.type === "input") {
        element.bindF = event => {
          let v = event.target.value;
          this.setState((prevState, currentProps) => {
            let newState = Object.assign({}, prevState);
            let s = newState;
            for (const key of newKeyAry) {
              s = s[key];
            }
            s.value = v;
            return newState;
          });
        };
      }
    });
    return stateObj;
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
        {
          // Object.keys(this.state.header).map(e => {
          //   return <SoHeader key={e} value={this.state.header[e]} />;
          // })}
          // <br />
          // <br />
          // <div>
          //   {this.state.subWindows.map(subWindow => {
          //     return <SoSubWindow key={subWindow.key} value={subWindow} />;
          //   })}
          // </div>
        }
        <div>
          <textarea style={{ width: "600px", height: "600px" }}>
            {JSON.stringify(this.state)}
          </textarea>
          <Assigner value={{ bindF: this._ffff }} />
        </div>
      </div>
    );
  }

  _ffff(event) {
    console.log(document.getElementsByClassName("hogehoge")[0].value);
    const json = JSON.parse(
      document.getElementsByClassName("hogehoge")[0].value
    );
    console.log(json);
    const obj = this.convert(json, []);
    this.setState(prevState => {
      const aaa = this._fix(obj, []);
      let newState = Object.assign({}, prevState);
      newState.subWindows.x5 = aaa.subWindows.x5;
      // TODO 何かの方法を考える
      // Object.keys(aaa).forEach(a => {
      //   newState[a] = aaa[a];
      // });
      return newState;
    });
  }
}

export default App;
