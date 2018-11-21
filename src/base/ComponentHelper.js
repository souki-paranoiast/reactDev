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
}

export default ComponentHelper;
