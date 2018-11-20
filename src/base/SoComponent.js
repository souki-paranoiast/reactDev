import { Component } from "react";
import Util from "../util/util";

class SoComponent extends Component {
  /**
   * @param {string} key Reactが裏で比較する際に求めるもの。DOM上のIDとは違うが、殆ど同じもの（と考えて良いはず）
   * @param {boolean} isPart 最小単位のコンポーネントかどうか（最小単位のコンポーネントのみ、一番親のstateを変更したり、newReactComponent()を発火しない
   * @param {function} fn 自分自身のコンポーネント生成関数
   */
  static baseDto(key, isPart, fn) {
    return {
      key: key,
      part: isPart,
      _f: fn
    };
  }

  /**
   * null or empty objectならデフォルトを使用する。paramStyleの[_forcibly]要素がtrueを返せばdefaultを無視する。それ以外はデフォルトに追加適用したものが返る。
   * @param {object} paramStyle propsから渡ってきたもの
   * @param {fucntion} defaultStyleSupplier デフォルトStyleObjectを生成する関数
   */
  patchStyle(paramStyle, defaultStyleSupplier) {
    if (Util.isEmptyObject(paramStyle)) {
      return defaultStyleSupplier();
    }
    if (!!paramStyle._forcibly) {
      return paramStyle;
    }
    let s = defaultStyleSupplier() || {};
    Object.keys(paramStyle).forEach(e => {
      s[e] = paramStyle[e];
    });
    return s;
  }
}

export default SoComponent;
