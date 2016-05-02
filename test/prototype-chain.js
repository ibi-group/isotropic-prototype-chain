import {
    describe,
    it
} from 'mocha';

import {
    expect
} from 'chai';

import prototypeChain from '../js/prototype-chain.js';

describe('prototype-chain', () => {
    it('should yield object prototypes', () => {
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

        for (const object of prototypeChain(a)) {
            objects.push(object);
        }

        expect(objects).to.deep.equal([
            a,
            b,
            c,
            d,
            e,
            Object.prototype
        ]);
    });
});
