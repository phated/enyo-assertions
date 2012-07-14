/*! Assertions - v0.1.0 - 2012-07-13
* Copyright (c) 2012 Blaine Bublitz; Licensed MIT */

enyo.kind({
  name: 'Assertions',
  kind: enyo.TestSuite,

  create: function(){
    this.inherited(arguments);

    var testSuite = this;
    var createTestFunc = function(key){
      return function(){
        testSuite.finish(chai.assert[key].apply(this, arguments));
      };
    };

    for(var key in chai.assert.prototype.constructor){
      testSuite.assert[key] = createTestFunc(key);
    }
  },
  assert: function(express, errmsg){
    this.finish(chai.assert(express, errmsg));
  }

});