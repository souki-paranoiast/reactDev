import { PureComponent } from "react";
import Util from "../util/Util";

// PureComponentを使用すると、stateとprops（の各要素を？）シャロー比較してくれる。
// 深い方まで比較すべき時は各コンポーネントで実装する必要あり。
// 必ずリレンダリングしたい場合はreturn true;でOK。 通常のComponentクラスの実装はreturn true;っぽい
// とはいえ、props.args要素はpushにしてるんだよなぁ。。Immutable.jsは使いたくないんだけど、、なるほど相性が悪い
class SoComponent extends PureComponent {
  /**
   * @param {string} key Reactが裏で比較する際に求めるもの。DOM上のIDとは違うが、殆ど同じもの（と考えて良いはず）
   * @param {boolean} isPart 最小単位のコンポーネントかどうか（最小単位のコンポーネントのみ、一番親のstateを変更したり、newReactComponent()を発火しない
   * @param {function} fn 自分自身のコンポーネント生成関数
   */
  static baseDto(key, isPart, fn) {
    return {
      key: key,
      _part: isPart,
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

  /**
   * 第2引数は配列以外なら可。配列の場合は展開したものを第1引数の要素にconcat()した結果を返す。配列として渡す場合はObjectでラッピングをする
   * @param {array} ary 
   * @param {any} addElement 
   */
  pushArgs(ary, addElement) { // これを使うこと自体が設計的に微妙な気がするのでどうにかしたい。何か上手く引数を渡せるか、引数を使わない方法で差し込みを。。
    if (ary == null || ary.length === 0) {
      return [addElement];
    }
    return ary.concat(addElement);
  }
}

export default SoComponent;
