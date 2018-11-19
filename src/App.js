import React, { Component } from "react";
import SoHeader from "./container/SoHeader";
import SoInputText from "./part/SoInputText";
import SoSubWindow from "./container/SoSubWindow";
import SoTable from "./container/SoTable";
import SoTableRow from "./container/SoTableRow";
import SoTableCell from "./container/SoTableCell";

class App extends Component {
  constructor(props) {
    super(props);
    const obj = {
      subWindows: {
        x1: SoSubWindow.newDto(
          "s-x1-key",
          "ほげほげ詳細ポップアップ",
          220,
          820,
          50,
          50,
          [
            SoInputText.newDto(
              "s-x1-key-date",
              "input",
              "date",
              13,
              "日付",
              undefined,
              e => (
                <SoInputText
                  key={e.key}
                  value={e}
                  ls={{ color: "blue" }}
                  is={{ color: "red" }}
                />
              )
            ),
            SoInputText.newDto(
              "s-x1-key-id",
              "input",
              "string",
              22,
              "ID",
              undefined
            ),
            SoInputText.newDto(
              "s-x1-key-num",
              "input",
              "number",
              13,
              "総数量",
              undefined
            ),
            SoSubWindow.newDto(
              "s-x1-key-nest1",
              "ほげほげ詳細ポップアップnest",
              220,
              820,
              50,
              50,
              [
                SoInputText.newDto(
                  "s-x1-key-nest1-num",
                  "input",
                  "number",
                  13,
                  "総数量",
                  undefined
                )
              ]
            )
          ]
        ),
        x2: SoSubWindow.newDto(
          "s-x2-key",
          "ほげほげ詳細ポップアップ２",
          220,
          820,
          100,
          100,
          [
            SoInputText.newDto(
              "s-x2-key-date",
              "input",
              "date",
              13,
              "何か",
              undefined,
              e => (
                <SoInputText
                  key={e.key}
                  value={e}
                  ls={{ color: "blue" }}
                  is={{ color: "red" }}
                />
              )
            ),
            SoInputText.newDto(
              "s-x2-key-id",
              "input",
              "string",
              22,
              "適当な",
              undefined
            ),
            SoInputText.newDto(
              "s-x2-key-num",
              "input",
              "number",
              13,
              "入力項目",
              undefined
            )
          ]
        )
      },
      headers: {
        x1: SoHeader.newDto("h-x1-key", "ヘッダラベル", 500, 1000, [
          SoInputText.newDto(
            "h-x1-key-num",
            "input",
            "number",
            13,
            "ヘッダ入力項目",
            16
          ),
          SoTable.newDto(
            "h-x1-key-table",
            { border: "1px solid", width: "1000px", height: "300px" },
            SoTableRow.newDto("h-x1-key-table-h-row", undefined, [
              SoTableCell.newDto(
                "h-x1-key-table-h-row-c1",
                "hogehoge21",
                undefined
              ),
              SoTableCell.newDto(
                "h-x1-key-table-h-row-c2",
                "hogehoge25",
                undefined
              )
            ]),
            [
              SoTableRow.newDto("h-x1-key-table-d-row1", undefined, [
                SoTableCell.newDto(
                  "h-x1-key-table-d-row1-c1",
                  "hogehoge27",
                  undefined
                ),
                SoTableCell.newDto(
                  "h-x1-key-table-d-row1-c2",
                  "hogehoge29",
                  undefined
                )
              ]),
              SoTableRow.newDto("h-x1-key-table-d-row2", undefined, [
                SoTableCell.newDto(
                  "h-x1-key-table-d-row2-c1",
                  "hogehoge32",
                  undefined
                ),
                SoTableCell.newDto(
                  "h-x1-key-table-d-row2-c2",
                  "hogehoge34",
                  undefined
                )
              ])
            ]
          )
        ])
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
    if (
      typeof stateObj === "string" ||
      typeof stateObj === "number" ||
      typeof stateObj === "boolean" ||
      typeof stateObj === "undefined"
    ) {
      // 各要素にnullは許容されていないのでプリミティブの判断はこれでOK
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
          // {/* <textarea style={{height: "600px", width: "600px"}} defaultValue={JSON.stringify(this.state, undefined, 2)}>
          // </textarea> */}
          // <br />
          // <div>
          //   {this.state.subWindows.map(subWindow => {
          //     return <SoSubWindow key={subWindow.key} value={subWindow} />;
          //   })}
          // </div>
        }
      </div>
    );
  }
}

export default App;
