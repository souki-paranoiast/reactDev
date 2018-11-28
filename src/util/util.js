class Util {
  /**
   * @returns {string or any} pure px numbers.
   */
  static purePx(value) {
    if (value == null) {
      return null;
    }
    if (value.endsWith && value.endsWith("px")) {
      return value.substring(0, value.length - 2);
    }
    return value; // TODO
  }

  /**
   * @returns {number} pure px numbers.
   */
  static purePxInt(value) {
    if (value == null) {
      return null;
    }
    return parseInt(this.purePx(value), 10);
  }

  /**
   * @param {string} size 
   * @param {number} multi integer
   * @returns {string} (size + (0.1 * mutil))rem
   */
  static incrementRem(size, multi) {
    if (size == null) {
      return null;
    }
    if (size.endsWith && size.endsWith("rem")) {
      const a = (1 * multi) / 10;
      return (parseFloat(size.substring(0, size.length - 3)) + a) + "rem";
    }
    return size; // TODO
  }

  static isEmptyObject(obj) {
    if (obj == null) {
      return true;
    }
    return Object.keys(obj).length === 0;
  }

  static isPrimitive(arg) {
    // == nullでundifinedとnullを補足。それ以外はnumber or string or boolean or object or functionなのでこれでOK。nullはobjectを返すらしいので、先に判定が必要。参考 http://cwestblog.com/2011/08/02/javascript-isprimitive-function/
    // ただし、NaNもnumber扱いらしいので場合によっては注意が必要。 というかこのロジックだとtypeはstring型確定なのに!=比較だとコンパイル時に注意が出る...
    const type = typeof arg;
    return arg == null || (type !== "object" && type !== "function");
  }

  _test() {
    // ES6ならパターンマッチによる変数代入が可能らしい。ただ、配列の場合とオブジェクトの場合で書き方が変わるのは面倒か。。タプル的なものは全社か
    const aaa = [5,4,3];
    const [a,b,c] = aaa;
    const {c1: hoge, c2: fuga} = {c1: 111, c2: "foo"};
    console.log(a, b, c, hoge, fuga);
  }
}

export default Util;
