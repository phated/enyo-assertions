# Assertions

EnyoJS wrapper for the Chai.js assertion library

## Why?

Abstracts the enyo.TestSuite finish() method into this.assert or this.expect calls (similar to the Test Package Wishlist)

## Usage

Assert

```javascript
enyo.kind({
  name: 'TestSuiteAssert',
  kind: 'phated.Assertions',

  testAssert: function(){
    var foo = 'bar';
    this.assert(foo == 'bar', "expected foo to equal `bar`");
  }
});
```

or

Expect

```javascript
enyo.kind({
  name: 'TestSuiteExpect',
  kind: 'phated.Assertions',

  testTrue: function(){
    this.expect(true).to.be.true;
    this.expect(false).to.not.be.true;
    this.expect(1).to.not.be.true;
  }
})
```

## Dependencies

This library is dependent on `enyo.TestSuite` in `$lib/extra/test`

## Tests

Tests can be found in the test directory.  They consist of the tests used to test the Chai assertion library written as an Enyo kind.  To run them, just open TestRunner.html in your browser.

## Build

Install Grunt (`npm install -g grunt`) and run the `grunt` command in this directory

## License

MIT