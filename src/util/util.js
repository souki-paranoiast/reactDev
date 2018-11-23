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
}

export default Util;
