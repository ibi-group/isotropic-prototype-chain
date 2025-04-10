# isotropic-prototype-chain

[![npm version](https://img.shields.io/npm/v/isotropic-prototype-chain.svg)](https://www.npmjs.com/package/isotropic-prototype-chain)
[![License](https://img.shields.io/npm/l/isotropic-prototype-chain.svg)](https://github.com/ibi-group/isotropic-prototype-chain/blob/main/LICENSE)
![](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

A generator function that walks through the prototype chain of an object.

## Why Use This?

- **Simple Iteration**: Easily iterate through all prototypes in an object's chain
- **Generator-Based**: Uses JavaScript generators for efficient lazy iteration
- **Reflection API**: Built on the modern `Reflect` API for reliable prototype access
- **No Dependencies**: Lightweight implementation with zero runtime dependencies

## Installation

```bash
npm install isotropic-prototype-chain
```

## Usage

```javascript
import _prototypeChain from 'isotropic-prototype-chain';

// Create an object with a prototype chain
class Animal {}
class Mammal extends Animal {}
class Dog extends Mammal {}

const dog = new Dog();

// Iterate through the prototype chain
for (const prototype of prototypeChain(dog)) {
    console.log(prototype);
}
// Outputs: Dog instance, Mammal.prototype, Animal.prototype, Object.prototype, null
```

## API

### prototypeChain(object)

A generator function that yields each prototype in the chain, starting with the object itself and continuing up to `Object.prototype`.

#### Parameters

- `object` (Object): The object whose prototype chain to iterate.

#### Returns

- (Generator): A generator that yields each object in the prototype chain, starting with the input object and continuing to the end of the chain.

## Examples

### Basic Usage

```javascript
import _prototypeChain from 'isotropic-prototype-chain';

const object = {
        a: 1
    },
    prototypeChain = [
        ..._prototypeChain(object)
    ];

console.log(prototypeChain); // [{ a: 1 }, Object.prototype]
```

### Custom Object Inheritance

```javascript
import _prototypeChain from 'isotropic-prototype-chain';

// Create a chain of objects with custom inheritance
const _child = {
        name: 'Child',
    },
    _grandparent = {
        name: 'Grandparent'
    },
    _parent = {
        name: 'Parent'
    };

Object.setPrototypeOf(_child, _parent);
Object.setPrototypeOf(_parent, _grandparent);

// Print the chain of names
for (const object of _prototypeChain(_child)) {
    console.log(object.name);
}
// Outputs: "Child", "Parent", "Grandparent", undefined
```

### Collecting All Properties in the Prototype Chain

```javascript
import _prototypeChain from 'isotropic-prototype-chain';

// Get all property names from the entire prototype chain
const _getPropertyNameSet = object => {
    const propertyNameSet = new Set();

    for (const prototype of _prototypeChain(object)) {
        for (const propertyName of Object.getOwnPropertyNames(prototype)) {
            propertyNameSet.add(propertyName);
        }
    }

    return propertyNameSet;
}

class A {
    constructor () {
        this.propA = 'A';
    }

    methodA () {}
}

class B extends A {
    constructor () {
        super();

        this.propB = 'B';
    }

    methodB () {}
}

class C extends B {
    constructor () {
        super();

        this.propC = 'C';
    }

    methodC() {}
}

console.log(...getPropertyNameSet(new C()));
// Outputs: propA propB propC constructor methodC methodB methodA, etc.
```

### Checking Multiple Inheritance or Mixins

```javascript
import _prototypeChain from 'isotropic-prototype-chain';

// Check if an object inherits from multiple specific constructors/classes
const _inheritsFrom = (object, ...constructorFunctions) => {
    const prototypeSet = new Set();

    // Collect all constructor prototypes to check against
    constructorFunctions.forEach(constructorFunction => {
        prototypeSet.add(constructorFunction.prototype);
    });

    // Check if any prototype in the chain matches any of the constructor prototypes
    let foundCount = 0;

    for (const prototype of _prototypeChain(object)) {
        if (prototypeSet.has(prototype)) {
            foundCount += 1;
        }
    }

    return foundCount === constructorFunctions.length;
}

// Test with inheritance
class Base {}
class Derived extends Base {}

{
    const object = new Derived();

    console.log(_inheritsFrom(object, Derived, Base)); // true
    console.log(_inheritsFrom(object, Base));          // true
    console.log(_inheritsFrom(object, Array));         // false
}
```

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/ibi-group/isotropic-prototype-chain/blob/main/CONTRIBUTING.md) for contribution guidelines.

## Issues

If you encounter any issues, please file them at https://github.com/ibi-group/isotropic-prototype-chain/issues
