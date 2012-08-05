enyo.kind({
  name: 'TestSuiteExpect',
  kind: 'phated.Assertions',

  err: function(fn, msg) {
    try {
      fn = enyo.bind(this, fn);
      fn();
      throw new chai.AssertionError({ message: 'Expected an error' });
    } catch (err) {
      this.expect(err.message).to.equal(msg);
    }
  },
  beforeEach: function() {
    this.didBefore=true;
  },
  afterEach: function() {
    if(this.leaveMarkInAfterEach) {
      window.afterWasExecuted = true;
    }
  },
  testChaiVersion: function() {
    this.expect(chai).to.have.property('version');
  },
  testAssertion: function(){
    this.expect('test').to.be.a('string');
    this.expect('foo').to.equal('foo');
  },
  testTrue: function(){
    this.expect(true).to.be.true;
    this.expect(false).to.not.be.true;
    this.expect(1).to.not.be.true;

    this.err(function(){
      this.expect('test').to.be.true;
    }, "expected 'test' to be true")
  },
  testOk: function(){
    this.expect(true).to.be.ok;
    this.expect(false).to.not.be.ok;
    this.expect(1).to.be.ok;
    this.expect(0).to.not.be.ok;

    this.err(function(){
      this.expect('').to.be.ok;
    }, "expected '' to be truthy");

    this.err(function(){
      this.expect('test').to.not.be.ok;
    }, "expected 'test' to be falsy");
  },
  testFalse: function(){
    this.expect(false).to.be.false;
    this.expect(true).to.not.be.false;
    this.expect(0).to.not.be.false;

    this.err(function(){
      this.expect('').to.be.false;
    }, "expected '' to be false")
  },
  testNull: function(){
    this.expect(null).to.be.null;
    this.expect(false).to.not.be.null;

    this.err(function(){
      this.expect('').to.be.null;
    }, "expected '' to be null")
  },
  testUndefined: function(){
    this.expect(undefined).to.be.undefined;
    this.expect(null).to.not.be.undefined;

    this.err(function(){
      this.expect('').to.be.undefined;
    }, "expected '' to be undefined")
  },
  testExist: function(){
    var foo = 'bar'
      , bar;
    this.expect(foo).to.exist;
    this.expect(bar).to.not.exist;
  },
  testArguments: function(){
    var args = (function(){ return arguments; })(1,2,3);
    this.expect(args).to.be.arguments;
    this.expect([]).to.not.be.arguments;
    this.expect(args).to.be.an('arguments').and.be.arguments;
    this.expect([]).to.be.an('array').and.not.be.Arguments;
  },
  testEqualFunction: function(){
    var foo;
    this.expect(undefined).to.equal(foo);
  },
  testTypeof: function(){
    this.expect('test').to.be.a('string');

    this.err(function(){
      this.expect('test').to.not.be.a('string');
    }, "expected 'test' not to be a string");

    this.expect(5).to.be.a('number');
    this.expect(new Number(1)).to.be.a('number');
    this.expect(Number(1)).to.be.a('number');
    this.expect(true).to.be.a('boolean');
    this.expect(new Array()).to.be.a('array');
    this.expect(new Object()).to.be.a('object');
    this.expect({}).to.be.a('object');
    this.expect([]).to.be.a('array');
    this.expect(function() {}).to.be.a('function');

    this.err(function(){
      this.expect(5).to.not.be.a('number');
    }, "expected 5 not to be a number");
  },
  testInstanceof: function(){
    function Foo(){}
    this.expect(new Foo()).to.be.an.instanceof(Foo);

    this.err(function(){
      this.expect(3).to.an.instanceof(Foo);
    }, "expected 3 to be an instance of Foo");
  },
  testWithinFunction: function(){
    this.expect(5).to.be.within(5, 10);
    this.expect(5).to.be.within(3,6);
    this.expect(5).to.be.within(3,5);
    this.expect(5).to.not.be.within(1,3);
    this.expect('foo').to.have.length.within(2,4);
    this.expect([ 1, 2, 3 ]).to.have.length.within(2,4);

    this.err(function(){
      this.expect(5).to.not.be.within(4,6);
    }, "expected 5 to not be within 4..6");

    this.err(function(){
      this.expect(10).to.be.within(50,100);
    }, "expected 10 to be within 50..100");

    this.err(function () {
      this.expect('foo').to.have.length.within(5,7);
    }, "expected \'foo\' to have a length within 5..7");

    this.err(function () {
      this.expect([ 1, 2, 3 ]).to.have.length.within(5,7);
    }, "expected [ 1, 2, 3 ] to have a length within 5..7");
  },
  testAboveFunction: function(){
    this.expect(5).to.be.above(2);
    this.expect(5).to.be.greaterThan(2);
    this.expect(5).to.not.be.above(5);
    this.expect(5).to.not.be.above(6);
    this.expect('foo').to.have.length.above(2);
    this.expect([ 1, 2, 3 ]).to.have.length.above(2);

    this.err(function(){
      this.expect(5).to.be.above(6);
    }, "expected 5 to be above 6");

    this.err(function(){
      this.expect(10).to.not.be.above(6);
    }, "expected 10 to be below 6");

    this.err(function () {
      this.expect('foo').to.have.length.above(4);
    }, "expected \'foo\' to have a length above 4 but got 3");

    this.err(function () {
      this.expect([ 1, 2, 3 ]).to.have.length.above(4);
    }, "expected [ 1, 2, 3 ] to have a length above 4 but got 3");
  },
  testBelowFunction: function(){
    this.expect(2).to.be.below(5);
    this.expect(2).to.be.lessThan(5);
    this.expect(2).to.not.be.below(2);
    this.expect(2).to.not.be.below(1);
    this.expect('foo').to.have.length.below(4);
    this.expect([ 1, 2, 3 ]).to.have.length.below(4);

    this.err(function(){
      this.expect(6).to.be.below(5);
    }, "expected 6 to be below 5");

    this.err(function(){
      this.expect(6).to.not.be.below(10);
    }, "expected 6 to be above 10");

    this.err(function () {
      this.expect('foo').to.have.length.below(2);
    }, "expected \'foo\' to have a length below 2 but got 3");

    this.err(function () {
      this.expect([ 1, 2, 3 ]).to.have.length.below(2);
    }, "expected [ 1, 2, 3 ] to have a length below 2 but got 3");
  },
  testMatchFunction: function(){
    this.expect('foobar').to.match(/^foo/)
    this.expect('foobar').to.not.match(/^bar/)

    this.err(function(){
      this.expect('foobar').to.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");

    this.err(function(){
      this.expect('foobar').to.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i");
  },
  testLengthFunction: function(){
    this.expect('test').to.have.length(4);
    this.expect('test').to.not.have.length(3);
    this.expect([1,2,3]).to.have.length(3);

    this.err(function(){
      this.expect(4).to.have.length(3);
    }, 'expected 4 to have a property \'length\'');

    this.err(function(){
      this.expect('asd').to.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");
  },
  testEqlFunction: function(){
    this.expect('test').to.eql('test');
    this.expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
    this.expect(1).to.eql(1);
    this.expect('4').to.not.eql(4);

    this.err(function(){
      this.expect(4).to.eql(3);
    }, 'expected 4 to deeply equal 3');
  },
  testEqualFunction2: function(){
    this.expect('test').to.equal('test');
    this.expect(1).to.equal(1);

    this.err(function(){
      this.expect(4).to.equal(3);
    }, 'expected 4 to equal 3');

    this.err(function(){
      this.expect('4').to.equal(4);
    }, "expected '4' to equal 4");
  },
  testDeepEqualFunction: function(){
    this.expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
    this.expect({ foo: 'bar' }).not.to.deep.equal({ foo: 'baz' });
  },
  testEmpty: function(){
    function FakeArgs() {};
    FakeArgs.prototype.length = 0;

    this.expect('').to.be.empty;
    this.expect('foo').not.to.be.empty;
    this.expect([]).to.be.empty;
    this.expect(['foo']).not.to.be.empty;
    this.expect(new FakeArgs).to.be.empty;
    this.expect({arguments: 0}).not.to.be.empty;
    this.expect({}).to.be.empty;
    this.expect({foo: 'bar'}).not.to.be.empty;

    this.err(function(){
      this.expect('').not.to.be.empty;
    }, "expected \'\' not to be empty");

    this.err(function(){
      this.expect('foo').to.be.empty;
    }, "expected \'foo\' to be empty");

    this.err(function(){
      this.expect([]).not.to.be.empty;
    }, "expected [] not to be empty");

    this.err(function(){
      this.expect(['foo']).to.be.empty;
    }, "expected [ \'foo\' ] to be empty");

    this.err(function(){
      this.expect(new FakeArgs).not.to.be.empty;
    }, "expected {} not to be empty");

    this.err(function(){
      this.expect({arguments: 0}).to.be.empty;
    }, "expected { arguments: 0 } to be empty");

    this.err(function(){
      this.expect({}).not.to.be.empty;
    }, "expected {} not to be empty");

    this.err(function(){
      this.expect({foo: 'bar'}).to.be.empty;
    }, "expected { foo: \'bar\' } to be empty");
  },
  testPropertyFunction: function(){
    this.expect('test').to.have.property('length');
    this.expect(4).to.not.have.property('length');

    this.expect({ 'foo.bar': 'baz' })
      .to.have.property('foo.bar');
    this.expect({ foo: { bar: 'baz' } })
      .to.not.have.property('foo.bar');

    this.err(function(){
      this.expect('asd').to.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
    this.err(function(){
      this.expect({ foo: { bar: 'baz' } })
        .to.have.property('foo.bar');
    }, "expected { foo: { bar: 'baz' } } to have a property 'foo.bar'");
  },
  testDeepPropertyFunction: function(){
    this.expect({ 'foo.bar': 'baz'})
      .to.not.have.deep.property('foo.bar');
    this.expect({ foo: { bar: 'baz' } })
      .to.have.deep.property('foo.bar');

    this.err(function(){
      this.expect({ 'foo.bar': 'baz' })
        .to.have.deep.property('foo.bar');
    }, "expected { 'foo.bar': 'baz' } to have a deep property 'foo.bar'");
  },
  testPropertyFunction2: function(){
    this.expect('test').to.have.property('length', 4);
    this.expect('asd').to.have.property('constructor', String);

    this.err(function(){
      this.expect('asd').to.have.property('length', 4);
    }, "expected 'asd' to have a property 'length' of 4, but got 3");

    this.err(function(){
      this.expect('asd').to.not.have.property('length', 3);
    }, "expected 'asd' to not have a property 'length' of 3");

    this.err(function(){
      this.expect('asd').to.not.have.property('foo', 3);
    }, "'asd' has no property 'foo'");

    this.err(function(){
      this.expect('asd').to.have.property('constructor', Number);
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");
  },
  testDeepPropertyFunction2: function(){
    this.expect({ foo: { bar: 'baz' } })
      .to.have.deep.property('foo.bar', 'baz');

    this.err(function(){
      this.expect({ foo: { bar: 'baz' } })
        .to.have.deep.property('foo.bar', 'quux');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.bar' of 'quux', but got 'baz'");
    this.err(function(){
      this.expect({ foo: { bar: 'baz' } })
        .to.not.have.deep.property('foo.bar', 'baz');
    }, "expected { foo: { bar: 'baz' } } to not have a deep property 'foo.bar' of 'baz'");
    this.err(function(){
      this.expect({ foo: 5 })
        .to.not.have.deep.property('foo.bar', 'baz');
    }, "{ foo: 5 } has no deep property 'foo.bar'");
  },
  testOwnPropertyFunction: function(){
    this.expect('test').to.have.ownProperty('length');
    this.expect('test').to.haveOwnProperty('length');
    this.expect({ length: 12 }).to.have.ownProperty('length');

    this.err(function(){
      this.expect({ length: 12 }).to.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  },
  testStringFunction: function(){
    this.expect('foobar').to.have.string('bar');
    this.expect('foobar').to.have.string('foo');
    this.expect('foobar').to.not.have.string('baz');

    this.err(function(){
      this.expect(3).to.have.string('baz');
    }, "expected 3 to be a string");

    this.err(function(){
      this.expect('foobar').to.have.string('baz');
    }, "expected 'foobar' to contain 'baz'");

    this.err(function(){
      this.expect('foobar').to.not.have.string('bar');
    }, "expected 'foobar' to not contain 'bar'");
  },
  testIncludeFunction: function(){
    this.expect(['foo', 'bar']).to.include('foo');
    this.expect(['foo', 'bar']).to.include('foo');
    this.expect(['foo', 'bar']).to.include('bar');
    this.expect([1,2]).to.include(1);
    this.expect(['foo', 'bar']).to.not.include('baz');
    this.expect(['foo', 'bar']).to.not.include(1);

    this.err(function(){
      this.expect(['foo']).to.include('bar');
    }, "expected [ 'foo' ] to include 'bar'");

    this.err(function(){
      this.expect(['bar', 'foo']).to.not.include('foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo'");
  },
  testKeysFunction: function(){
    this.expect({ foo: 1 }).to.have.keys(['foo']);
    this.expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
    this.expect({ foo: 1, bar: 2 }).to.have.keys('foo', 'bar');
    this.expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
    this.expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('bar', 'foo');
    this.expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('baz');

    this.expect({ foo: 1, bar: 2 }).to.contain.keys('foo');
    this.expect({ foo: 1, bar: 2 }).to.contain.keys('bar', 'foo');
    this.expect({ foo: 1, bar: 2 }).to.contain.keys(['foo']);
    this.expect({ foo: 1, bar: 2 }).to.contain.keys(['bar']);
    this.expect({ foo: 1, bar: 2 }).to.contain.keys(['bar', 'foo']);

    this.expect({ foo: 1, bar: 2 }).to.not.have.keys('baz');
    this.expect({ foo: 1, bar: 2 }).to.not.have.keys('foo', 'baz');
    this.expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz');
    this.expect({ foo: 1, bar: 2 }).to.not.contain.keys('foo', 'baz');
    this.expect({ foo: 1, bar: 2 }).to.not.contain.keys('baz', 'foo');

    this.err(function(){
      this.expect({ foo: 1 }).to.have.keys();
    }, "keys required");

    this.err(function(){
      this.expect({ foo: 1 }).to.have.keys([]);
    }, "keys required");

    this.err(function(){
      this.expect({ foo: 1 }).to.not.have.keys([]);
    }, "keys required");

    this.err(function(){
      this.expect({ foo: 1 }).to.contain.keys([]);
    }, "keys required");

    this.err(function(){
      this.expect({ foo: 1 }).to.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    this.err(function(){
      this.expect({ foo: 1 }).to.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    this.err(function(){
      this.expect({ foo: 1 }).to.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    this.err(function(){
      this.expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    this.err(function(){
      this.expect({ foo: 1 }).to.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    this.err(function(){
      this.expect({ foo: 1, bar: 2 }).to.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");

    this.err(function(){
      this.expect({ foo: 1 }).to.not.contain.keys(['foo']);
    }, "expected { foo: 1 } to not contain key 'foo'");

    this.err(function(){
      this.expect({ foo: 1 }).to.contain.keys('foo', 'bar');
    }, "expected { foo: 1 } to contain keys 'foo', and 'bar'");
  },
  testChaining: function(){
    var tea = { name: 'chai', extras: ['milk', 'sugar', 'smile'] };
    this.expect(tea).to.have.property('extras').with.lengthOf(3);

    this.err(function(){
      this.expect(tea).to.have.property('extras').with.lengthOf(4);
    }, "expected [ 'milk', 'sugar', 'smile' ] to have a length of 4 but got 3");

    this.expect(tea).to.be.a('object').and.have.property('name', 'chai');
  },
  testThrow: function () {
    // See GH-45: some poorly-constructed custom errors don't have useful names
    // on either their constructor or their constructor prototype, but instead
    // only set the name inside the constructor itself.
    var PoorlyConstructedError = function () {
      this.name = 'PoorlyConstructedError';
    };
    PoorlyConstructedError.prototype = Object.create(Error.prototype);

    var specificError = new RangeError('boo');

    var goodFn = function () { 1==1; }
      , badFn = function () { throw new Error('testing'); }
      , refErrFn = function () { throw new ReferenceError('hello'); }
      , ickyErrFn = function () { throw new PoorlyConstructedError(); }
      , specificErrFn = function () { throw specificError; };

    this.expect(goodFn).to.not.throw();
    this.expect(goodFn).to.not.throw(Error);
    this.expect(goodFn).to.not.throw(specificError);
    this.expect(badFn).to.throw();
    this.expect(badFn).to.throw(Error);
    this.expect(badFn).to.not.throw(ReferenceError);
    this.expect(badFn).to.not.throw(specificError);
    this.expect(refErrFn).to.throw();
    this.expect(refErrFn).to.throw(ReferenceError);
    this.expect(refErrFn).to.throw(Error);
    this.expect(refErrFn).to.not.throw(TypeError);
    this.expect(refErrFn).to.not.throw(specificError);
    this.expect(ickyErrFn).to.throw();
    this.expect(ickyErrFn).to.throw(PoorlyConstructedError);
    this.expect(ickyErrFn).to.throw(Error);
    this.expect(ickyErrFn).to.not.throw(specificError);
    this.expect(specificErrFn).to.throw(specificError);

    this.expect(badFn).to.throw(/testing/);
    this.expect(badFn).to.not.throw(/hello/);
    this.expect(badFn).to.throw('testing');
    this.expect(badFn).to.not.throw('hello');

    this.expect(badFn).to.throw(Error, /testing/);
    this.expect(badFn).to.throw(Error, 'testing');

    this.err(function(){
      this.expect(goodFn).to.throw();
    }, "expected [Function] to throw an error");

    this.err(function(){
      this.expect(goodFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError");

    this.err(function(){
      this.expect(goodFn).to.throw(specificError);
    }, "expected [Function] to throw [RangeError: boo]");

    this.err(function(){
      this.expect(badFn).to.not.throw();
    }, "expected [Function] to not throw an error");

    this.err(function(){
      this.expect(badFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError but a Error was thrown");

    this.err(function(){
      this.expect(badFn).to.throw(specificError);
    }, "expected [Function] to throw [RangeError: boo] but [Error: testing] was thrown");

    this.err(function(){
      this.expect(badFn).to.not.throw(Error);
    }, "expected [Function] to not throw Error");

    this.err(function(){
      this.expect(refErrFn).to.not.throw(ReferenceError);
    }, "expected [Function] to not throw ReferenceError");

    this.err(function(){
      this.expect(badFn).to.throw(PoorlyConstructedError);
    }, "expected [Function] to throw PoorlyConstructedError but a Error was thrown");

    this.err(function(){
      this.expect(ickyErrFn).to.not.throw(PoorlyConstructedError);
    }, "expected [Function] to not throw PoorlyConstructedError");

    this.err(function(){
      this.expect(ickyErrFn).to.throw(ReferenceError);
    }, "expected [Function] to throw ReferenceError but a PoorlyConstructedError was thrown");

    this.err(function(){
      this.expect(specificErrFn).to.throw(new ReferenceError('eek'));
    }, "expected [Function] to throw [ReferenceError: eek] but [RangeError: boo] was thrown");

    this.err(function(){
      this.expect(specificErrFn).to.not.throw(specificError);
    }, "expected [Function] to not throw [RangeError: boo]");

    this.err(function (){
      this.expect(badFn).to.not.throw(/testing/);
    }, "expected [Function] to throw error not matching /testing/");

    this.err(function () {
      this.expect(badFn).to.throw(/hello/);
    }, "expected [Function] to throw error matching /hello/ but got \'testing\'");

    this.err(function () {
      this.expect(badFn).to.throw(Error, /hello/);
    }, "expected [Function] to throw error matching /hello/ but got 'testing'");

    this.err(function () {
      this.expect(badFn).to.throw(Error, 'hello');
    }, "expected [Function] to throw error including 'hello' but got 'testing'");
  },
  testRespondTo: function(){
    function Foo(){};
    Foo.prototype.bar = function(){};
    Foo.func = function() {};

    var bar = {};
    bar.foo = function(){};

    this.expect(Foo).to.respondTo('bar');
    this.expect(Foo).to.not.respondTo('foo');
    this.expect(Foo).itself.to.respondTo('func');
    this.expect(Foo).itself.not.to.respondTo('bar');

    this.expect(bar).to.respondTo('foo');

    this.err(function(){
      this.expect(Foo).to.respondTo('baz');
    }, "expected { [Function: Foo] func: [Function] } to respond to \'baz\'");

    this.err(function(){
      this.expect(bar).to.respondTo('baz');
    }, "expected { foo: [Function] } to respond to \'baz\'");
  },
  testSatisfy: function(){
    var matcher = function(num){
      return num === 1;
    };

    this.expect(1).to.satisfy(matcher);

    this.err(function(){
      this.expect(2).to.satisfy(matcher);
    }, "expected 2 to satisfy [Function]");
  },
  testCloseTo: function(){
    this.expect(1.5).to.be.closeTo(1.0, 0.5);
    this.expect(10).to.be.closeTo(20, 20);
    this.expect(-10).to.be.closeTo(20, 30);

    this.err(function(){
      this.expect(2).to.be.closeTo(1.0, 0.5);
    }, "expected 2 to be close to 1 +/- 0.5");

    this.err(function(){
      this.expect(-10).to.be.closeTo(20, 29);
    }, "expected -10 to be close to 20 +/- 29");
  }

});