/* eslint-disable require-jsdoc */
export default (function* (object) {
    while (object) {
        yield object;
        object = Reflect.getPrototypeOf(object);
    }
});
