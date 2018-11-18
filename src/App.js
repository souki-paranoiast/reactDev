import React, { Component } from 'react';
import SoHeader from './SoHeader';
import SoInputText from './part/SoInputText';
import SoSubWindow from './SoSubWindow';

class App extends Component {

  constructor(props) {
    super(props);
    const obj = {
      subWindow: {
        x1: [
          SoInputText.newDto("s-x1-key-date", "input", "date", 13, "日付", undefined),
          SoInputText.newDto("s-x1-key-id", "input", "string", 22, "ID", undefined),
          SoInputText.newDto("s-x1-key-num", "input", "numver", 13, "総数量", undefined),
        ]
      },
      header: {
        x1: [
          SoInputText.newDto("h-x1-key-date", "input", "date", 13, "日付", undefined),
          SoInputText.newDto("h-x1-key-id", "input", "string", 22, "ID", undefined),
          SoInputText.newDto("h-x1-key-num", "input", "numver", 13, "総数量", undefined),
        ]
      },
      detail: {
        x1: [
          SoInputText.newDto("d-x1-key-code", "input", "string", 13, "コード", undefined),
          SoInputText.newDto("d-x1-key-num", "input", "number", 13, "数量", undefined),
        ]
      }
    };
    this.state = this._fix(obj, []);
    this.render = this.render.bind(this);
  }

  /**
 * @param {object} stateObj 
 * @param {Array} keyAry 
 */
  _fix(stateObj, keyAry) {
    Object.keys(stateObj).forEach((e) => {
      let newKeyAry = keyAry.concat(e);
      let element = stateObj[e];
      if (element.type == null) { // typeが存在するのは基本的に最小単位
        this._fix(element, newKeyAry);

      } else if (element.type === "input") {
        element.bindF = (event) => {
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
        {Object.keys(this.state.header).map((e) => {
          return (<SoHeader key={e} value={this.state.header[e]} />);
        })}
        <br />
        {/* <textarea style={{height: "600px", width: "600px"}} defaultValue={JSON.stringify(this.state, undefined, 2)}>
        </textarea> */}
        <br />
        <div>
          {Object.keys(this.state.subWindow).map(e => {
            return (<SoSubWindow key={e} value={this.state.subWindow[e]} />);
          })}
        </div>
      </div>
    );
  }
}

export default App;
