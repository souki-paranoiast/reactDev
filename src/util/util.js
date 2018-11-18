
class Util {
    /**
     * @returns pure px numbers.
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
}

export default Util;