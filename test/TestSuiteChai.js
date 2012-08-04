enyo.kind({
  name: 'TestSuiteChai',
  kind: 'phated.Assertions',

  err: function(fn, msg) {
    try {
      fn = enyo.bind(this, fn);
      fn();
      throw new chai.AssertionError({ message: 'Expected an error' });
    } catch (err) {
      this.assert.equal(msg, err.message);
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
  testAssert: function(){
    var foo = 'bar';
    this.assert(foo == 'bar', "expected foo to equal `bar`");

    this.err(function () {
      this.assert(foo == 'baz', "expected foo to equal `bar`");
    }, "expected foo to equal `bar`");
  },
  testIsTrue: function () {
    this.assert.isTrue(true);

    this.err(function() {
      this.assert.isTrue(false);
    }, "expected false to be true");

    this.err(function() {
      this.assert.isTrue(1);
    }, "expected 1 to be true");

    this.err(function() {
      this.assert.isTrue('test');
    }, "expected 'test' to be true");
  },
  testOk: function () {
    this.assert.ok(true);
    this.assert.ok(1);
    this.assert.ok('test');

    this.err(function () {
      this.assert.ok(false);
    }, "expected false to be truthy");

    this.err(function () {
      this.assert.ok(0);
    }, "expected 0 to be truthy");

    this.err(function () {
      this.assert.ok('');
    }, "expected '' to be truthy");
  },
  testIsFalse: function () {
    this.assert.isFalse(false);

    this.err(function() {
      this.assert.isFalse(true);
    }, "expected true to be false");

    this.err(function() {
      this.assert.isFalse(0);
    }, "expected 0 to be false");
  },
  testEqual: function () {
    var foo;
    this.assert.equal(foo, undefined);
  },
  testTypeofNotTypeOf: function () {
    this.assert.typeOf('test', 'string');
    this.assert.typeOf(true, 'boolean');
    this.assert.typeOf(5, 'number');

    this.err(function () {
      this.assert.typeOf(5, 'string');
    }, "expected 5 to be a string");
  },
  testNotTypeOf: function () {
    this.assert.notTypeOf('test', 'number');

    this.err(function () {
      this.assert.notTypeOf(5, 'number');
    }, "expected 5 not to be a number");
  },
  testInstanceOf: function() {
    function Foo(){}
    this.assert.instanceOf(new Foo(), Foo);

    this.err(function () {
      this.assert.instanceOf(5, Foo);
    }, "expected 5 to be an instance of Foo");
  },
  testNotInstanceOf: function () {
    function Foo(){}
    this.assert.notInstanceOf(new Foo(), String);

    this.err(function () {
      this.assert.notInstanceOf(new Foo(), Foo);
    }, "expected {} to not be an instance of Foo");
  },
  testIsObject: function () {
    function Foo(){}
    this.assert.isObject({});
    this.assert.isObject(new Foo());

    this.err(function() {
      this.assert.isObject(true);
    }, "expected true to be an object");

    this.err(function() {
      this.assert.isObject(Foo);
    }, "expected [Function: Foo] to be an object");

    this.err(function() {
      this.assert.isObject('foo');
    }, "expected 'foo' to be an object");
  },
  testIsNotObject: function () {
    function Foo(){}
    this.assert.isNotObject(5);

    this.err(function() {
      this.assert.isNotObject({});
    }, "expected {} not to be an object");
  },
  testNotEqual: function() {
    this.assert.notEqual(3, 4);

    this.err(function () {
      this.assert.notEqual(5, 5);
    }, "expected 5 to not equal 5");
  },
  testStrictEqual: function() {
    this.assert.strictEqual('foo', 'foo');

    this.err(function () {
      this.assert.strictEqual('5', 5);
    }, "expected \'5\' to equal 5");
  },
  testNotStrictEqual: function() {
    this.assert.notStrictEqual(5, '5');

    this.err(function () {
      this.assert.notStrictEqual(5, 5);
    }, "expected 5 to not equal 5");
  },
  testDeepEqual: function() {
    this.assert.deepEqual({tea: 'chai'}, {tea: 'chai'});

    this.err(function () {
      this.assert.deepEqual({tea: 'chai'}, {tea: 'black'});
    }, "expected { tea: \'chai\' } to deeply equal { tea: \'black\' }");
  },
  testNotDeepEqual: function() {
    this.assert.notDeepEqual({tea: 'jasmine'}, {tea: 'chai'});

    this.err(function () {
      this.assert.notDeepEqual({tea: 'chai'}, {tea: 'chai'});
    }, "expected { tea: \'chai\' } to not deeply equal { tea: \'chai\' }");
  },
  testIsNull: function() {
    this.assert.isNull(null);

    this.err(function () {
      this.assert.isNull(undefined);
    }, "expected undefined to equal null");
  },
  testIsNotNull: function() {
    this.assert.isNotNull(undefined);

    this.err(function () {
      this.assert.isNotNull(null);
    }, "expected null to not equal null");
  },
  testIsUndefined: function() {
    this.assert.isUndefined(undefined);

    this.err(function () {
      this.assert.isUndefined(null);
    }, "expected null to equal undefined");
  },
  testIsDefined: function() {
    this.assert.isDefined(null);

    this.err(function () {
      this.assert.isDefined(undefined);
    }, "expected undefined to not equal undefined");
  },
  testIsFunction: function() {
    var func = function() {};
    this.assert.isFunction(func);

    this.err(function () {
      this.assert.isFunction({});
    }, "expected {} to be a function");
  },
  testIsNotFunction: function () {
    this.assert.isNotFunction(5);

    this.err(function () {
      this.assert.isNotFunction(function () {});
    }, "expected [Function] not to be a function");
  },
  testIsArray: function() {
    this.assert.isArray([]);
    this.assert.isArray(new Array);

    this.err(function () {
      this.assert.isArray({});
    }, "expected {} to be an array");
  },
  testIsNotArray: function () {
    this.assert.isNotArray(3);

    this.err(function () {
      this.assert.isNotArray([]);
    }, "expected [] not to be an array");

    this.err(function () {
      this.assert.isNotArray(new Array);
    }, "expected [] not to be an array");
  },
  testIsString: function() {
    this.assert.isString('Foo');
    this.assert.isString(new String('foo'));

    this.err(function () {
      this.assert.isString(1);
    }, "expected 1 to be a string");
  },
  testIsNotString: function () {
    this.assert.isNotString(3);
    this.assert.isNotString([ 'hello' ]);

    this.err(function () {
      this.assert.isNotString('hello');
    }, "expected 'hello' not to be a string");
  },
  testIsNumber: function() {
    this.assert.isNumber(1);
    this.assert.isNumber(Number('3'));

    this.err(function () {
      this.assert.isNumber('1');
    }, "expected \'1\' to be a number");
  },
  testIsNotNumber: function () {
    this.assert.isNotNumber('hello');
    this.assert.isNotNumber([ 5 ]);

    this.err(function () {
      this.assert.isNotNumber(4);
    }, "expected 4 not to be a number");
  },
  testIsBoolean: function() {
    this.assert.isBoolean(true);
    this.assert.isBoolean(false);

    this.err(function () {
      this.assert.isBoolean('1');
    }, "expected \'1\' to be a boolean");
  },
  testIsNotBoolean: function () {
    this.assert.isNotBoolean('true');

    this.err(function () {
      this.assert.isNotBoolean(true);
    }, "expected true not to be a boolean");

    this.err(function () {
      this.assert.isNotBoolean(false);
    }, "expected false not to be a boolean");
  },
  testInclude: function() {
    this.assert.include('foobar', 'bar');
    this.assert.include([ 1, 2, 3], 3);

    this.err(function () {
      this.assert.include('foobar', 'baz');
    }, "expected \'foobar\' to contain \'baz\'");
  },
  testLengthOf: function() {
    this.assert.lengthOf([1,2,3], 3);
    this.assert.lengthOf('foobar', 6);

    this.err(function () {
      this.assert.lengthOf('foobar', 5);
    }, "expected 'foobar' to have a length of 5 but got 6");

    this.err(function () {
      this.assert.lengthOf(1, 5);
    }, "expected 1 to have a property \'length\'");
  },
  testMatch: function () {
    this.assert.match('foobar', /^foo/);
    this.assert.notMatch('foobar', /^bar/);

    this.err(function () {
      this.assert.match('foobar', /^bar/i);
    }, "expected 'foobar' to match /^bar/i");

    this.err(function () {
      this.assert.notMatch('foobar', /^foo/i);
    }, "expected 'foobar' not to match /^foo/i");
  },
  testProperty: function () {
    var obj = { foo: { bar: 'baz' } };
    var simpleObj = { foo: 'bar' };
    this.assert.property(obj, 'foo');
    this.assert.deepProperty(obj, 'foo.bar');
    this.assert.notProperty(obj, 'baz');
    this.assert.notProperty(obj, 'foo.bar');
    this.assert.notDeepProperty(obj, 'foo.baz');
    this.assert.deepPropertyVal(obj, 'foo.bar', 'baz');
    this.assert.deepPropertyNotVal(obj, 'foo.bar', 'flow');

    this.err(function () {
      this.assert.property(obj, 'baz');
    }, "expected { foo: { bar: 'baz' } } to have a property 'baz'");

    this.err(function () {
      this.assert.deepProperty(obj, 'foo.baz');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.baz'");

    this.err(function () {
      this.assert.notProperty(obj, 'foo');
    }, "expected { foo: { bar: 'baz' } } to not have property 'foo'");

    this.err(function () {
      this.assert.notDeepProperty(obj, 'foo.bar');
    }, "expected { foo: { bar: 'baz' } } to not have deep property 'foo.bar'");

    this.err(function () {
      this.assert.propertyVal(simpleObj, 'foo', 'ball');
    }, "expected { foo: 'bar' } to have a property 'foo' of 'ball', but got 'bar'");

    this.err(function () {
      this.assert.deepPropertyVal(obj, 'foo.bar', 'ball');
    }, "expected { foo: { bar: 'baz' } } to have a deep property 'foo.bar' of 'ball', but got 'baz'");

    this.err(function () {
      this.assert.propertyNotVal(simpleObj, 'foo', 'bar');
    }, "expected { foo: 'bar' } to not have a property 'foo' of 'bar'");

    this.err(function () {
      this.assert.deepPropertyNotVal(obj, 'foo.bar', 'baz');
    }, "expected { foo: { bar: 'baz' } } to not have a deep property 'foo.bar' of 'baz'");
  },
  testThrows: function() {
    this.assert.throws(function() { throw new Error('foo'); });
    this.assert.throws(function() { throw new Error('bar'); }, 'foo');

    this.err(function () {
      this.assert.throws(function() {});
    }, "expected [Function] to throw an error");
  },
  testDoesNotThrow: function() {
    this.assert.doesNotThrow(function() { });
    this.assert.doesNotThrow(function() { }, 'foo');

    this.err(function () {
      this.assert.doesNotThrow(function() { throw new Error('foo'); });
    }, 'expected [Function] to not throw an error');
  },
  testIfError: function() {
    this.assert.ifError(false);
    this.assert.ifError(null);
    this.assert.ifError(undefined);

    this.err(function () {
      this.assert.ifError('foo');
    }, "expected \'foo\' to be falsy");
  },
  testOperator: function() {
    this.assert.operator(1, '<', 2);
    this.assert.operator(2, '>', 1);
    this.assert.operator(1, '==', 1);
    this.assert.operator(1, '<=', 1);
    this.assert.operator(1, '>=', 1);
    this.assert.operator(1, '!=', 2);
    this.assert.operator(1, '!==', 2);

    this.err(function () {
      this.assert.operator(1, '=', 2);
    }, 'Invalid operator "="');

    this.err(function () {
      this.assert.operator(2, '<', 1);
    }, "expected 2 to be < 1");

    this.err(function () {
      this.assert.operator(1, '>', 2);
    }, "expected 1 to be > 2");

    this.err(function () {
      this.assert.operator(1, '==', 2);
    }, "expected 1 to be == 2");

    this.err(function () {
      this.assert.operator(2, '<=', 1);
    }, "expected 2 to be <= 1");

    this.err(function () {
      this.assert.operator(1, '>=', 2);
    }, "expected 1 to be >= 2");

    this.err(function () {
      this.assert.operator(1, '!=', 1);
    }, "expected 1 to be != 1");

    this.err(function () {
      this.assert.operator(1, '!==', '1');
    }, "expected 1 to be !== \'1\'");
  }

});