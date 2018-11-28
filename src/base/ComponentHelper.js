import SoHeader from "../container/SoHeader";
import SoSubWindow from "../container/SoSubWindow";
import SoTable from "../container/SoTable";
import SoTableRow from "../container/SoTableRow";
import SoTableCell from "../container/SoTableCell";
import SoInputText from "../part/SoInputText";
import SoImage from "../part/SoImage";

// 本来ならこんなオブジェクトは作りたくないが、とりあえず以下の理由などから用意。
// ・ContaierのComponentを動的に増加させる場合に、JSON形式でAssginしても各コンポーネントのnewDto()を動かせない
// ・動的import()とeval()で可能ではあるが、Componentの動的追加をWebサーバのResponse経由で作成する予定のため、容易に値を突っ込めることを考えるとevalの使用が戸惑われる。
class ComponentHelper {
  /**
   *
   * @param {{clz: string, key: string, args: array}} args is variable arguments parameter
   */
  static newDto(obj) {
    switch (obj.clz) {
      case "SoHeader":
        return SoHeader.newDto(obj);

      case "SoSubWindow":
        return SoSubWindow.newDto(obj);

      case "SoTable":
        return SoTable.newDto(obj);

      case "SoTableRow":
        return SoTableRow.newDto(obj);

      case "SoTableCell":
        return SoTableCell.newDto(obj);

      case "SoInputText":
        return SoInputText.newDto(obj);

      case "SoImage":
        return SoImage.newDto(obj);

      default:
        throw new Error(`Not supported class parameter. ${obj.clz}`);
    }
  }

  static _template() {
    const src = this.newDto.toString();
    const lines = src.split(/\r|\n|\r\n/);
    const clzObjList = lines.map(line => line.trim())
      .filter(line => line.startsWith("case \""))
      .map(line => line.substring(6, line.length - 2))
      .map(clz => {
        const o = this.newDto({ clz });
        let n = {};
        n.clz = clz;
        n = Object.assign(n, o); // 順番入れ替え
        return n;
      });

    const s = JSON.stringify(clzObjList, (key, value) => {
      if (key === "children" || key === "detailRows" || key === "evList" || key === "cells") {
        return [];
      }
      if (key === "style" || key === "child") {
        return {};
      }
      if (key.startsWith("_")) { // functionはそもそも消えてOK。_で始まるのは自分で設定するものじゃないので消す
        return undefined;
      }
      if (value == null) {
        return "";
      }
      return value;
    });
    console.log(s);
  }
}


export default ComponentHelper;
