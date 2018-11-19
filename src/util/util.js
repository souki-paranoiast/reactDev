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
}

export default Util;
