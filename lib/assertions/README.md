# Assertions

EnyoJS wrapper for the Chai.js assertion library

## Why?

Abstracts the enyo.TestSuite finish() method into this.assert calls (similar to the Test Package Wishlist)

## Usage

```javascript
enyo.kind({
  name: 'TestSuiteChai',
  kind: 'phated.Assertions',

  testAssert: function(){
    var foo = 'bar';
    this.assert(foo == 'bar', "expected foo to equal `bar`");
  }
});
```

## Dependencies

This library is dependent on `enyo.TestSuite` in `$lib/extra/test`

## Tests

Tests can be found in the test directory.  They consist of the tests used to test the Chai assertion library written as an Enyo kind.  To run them, just open TestRunner.html in your browser.

## Build

Install Grunt (`npm install -g grunt`) and run the `grunt` command in this directory

## License

MIT