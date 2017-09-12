import _chai from 'chai';
import _mocha from 'mocha';
import _prototypeChain from '../js/prototype-chain.js';

_mocha.describe('prototype-chain', () => {
    _mocha.it('should yield object prototypes', () => {
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
});
