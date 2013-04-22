/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('function', function() {
  var functionFactory;

  beforeEach(module('io.factories'));

  it('should syncVar', inject(function($function) {
    expect($function.syncVar({
      'a':1,
      'b':2
    },{
      'a':3,
      'b':4
    })).toEqual({
      'a':1,
      'b':2
    });
    
    expect($function.syncVar([1,2],[1,3])).toEqual([1,2]);
  }));
  
  /*it('should inArray', inject(function($function) {
    expect($function.inArray(1,[0,1,2])).toEqual(true);
    expect($function.inArray('1',['0','1','2'])).toEqual(true);
    expect($function.inArray(0, [1,2,3])).toEqual(false);
  }));*/
  
  it('should objectIsEmpty', inject(function($function) {
    expect($function.objectIsEmpty({})).toEqual(true);
    expect($function.objectIsEmpty({'a':1})).toEqual(false);
  }));
  
  it('should objectLength', inject(function($function) {
    expect($function.objectLength({})).toEqual(0);
    expect($function.objectLength({'a':1})).toEqual(1);
  }));
  
  /*it('should objectArray', inject(function($function) {
    expect($function.objectArray({})).toEqual([]);
    expect($function.objectArray({'a':1})).toEqual([1]);
  }));*/
});