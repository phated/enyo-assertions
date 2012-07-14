# Assertions

EnyoJS wrapper for the Chai.js assertion library

## Why?

Abstracts the enyo.TestSuite finish() method into this.assert calls (similar to the Test Package Wishlist)

## Usage

```javascript
enyo.kind({
  name: "TestSuiteChai",
  kind: 'Assertions',

  testAssert: function(){
    var foo = 'bar';
    this.assert(foo == 'bar', "expected foo to equal `bar`");
  }
});
```