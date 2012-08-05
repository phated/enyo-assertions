/*! Assertions - v0.1.0 - 2012-08-04
* Copyright (c) 2012 Blaine Bublitz; Licensed MIT */

enyo.kind({
  name: 'phated.Assertions',
  kind: enyo.TestSuite,

  create: function(){
    this.inherited(arguments);

    var testSuite = this;
    var createAssertFunc = function(key){
      return function(){
        testSuite.finish(chai.assert[key].apply(this, arguments));
      };
    };

    var createExpectFunc = function(key){
      return function(){
        try {
          return chai.Assertion[key].apply(this, arguments);
        } catch(e){
          console.log(e);
          testSuite.finish(e.message);
        }
      };
    };

    var key;
    for(key in chai.assert.prototype.constructor){
      testSuite.assert[key] = createAssertFunc(key);
    }

    for(key in chai.Assertion.prototype){
      testSuite.expect[key] = createExpectFunc(key);
    }
  },
  assert: function(express, errmsg){
    this.finish(chai.assert(express, errmsg));
  },
  expect: function(val, message) {
    var expectResult = chai.expect(val, message);
    if(expectResult && expectResult instanceof chai.Assertion){
      this.finish();
    }
    return expectResult;
  }

});