import _chai from 'isotropic-dev-dependencies/lib/chai.js';
import _prototypeChain from '../lib/prototype-chain.js';
import _test from 'node:test';

_test.describe('prototype-chain', () => {
    _test.it('should yield object prototypes', () => {
        const a = {},
            b = {},
            c = {},
            d = {},
            e = {},
            objects = [];

        Reflect.setPrototypeOf(a, b);
        Reflect.setPrototypeOf(b, c);
        Reflect.setPrototypeOf(c, d);
        Reflect.setPrototypeOf(d, e);

        for (const object of _prototypeChain(a)) {
            objects.push(object);
        }

        _chai.expect(objects).to.deep.equal([
            a,
            b,
            c,
            d,
            e,
            Object.prototype
        ]);
    });

    _test.it('should not yield null', () => {
        const objects = [];

        for (const object of _prototypeChain(null)) {
            objects.push(object);
        }

        _chai.expect(objects).to.deep.equal([]);
    });

    _test.it('should stop when an object has no prototype', () => {
        const objects = [],
            objectWithoutPrototype = Object.create(null);

        for (const object of _prototypeChain(objectWithoutPrototype)) {
            objects.push(object);
        }

        _chai.expect(objects).to.deep.equal([
            objectWithoutPrototype
        ]);
    });
});
