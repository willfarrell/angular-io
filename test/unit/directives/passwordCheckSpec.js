/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('passwordCheck', function() {
  var $compile, $rootScope, $timeout,
      html, element, scope, changeValue;
  
  beforeEach(module('io.filters'));
  beforeEach(module('io.directives'));
  beforeEach(inject(function($rootScope, $compile, $timeout) {
    // setup
    html = '<form name="form"><input type="text" name="input" data-ng-model="inputValue" data-sameas="sameas" data-password-check></form>';
    element = angular.element(html);
    scope = $rootScope;
    element = $compile(element)(scope);
    scope.$digest();
    
    //wait = function(){ $timeout(function(){},0); };
    
    // change model
    changeValue = function(val) {
      scope.$apply(function() {
        scope.inputValue = val;
      });
      scope.$digest();
    };
    
  }));
  
  it('should have multiple error params', function() {
    changeValue('');
    expect(scope.form.input.$error.minlength).toEqual(false);
    expect(scope.form.input.$error.number).toEqual(false);
    expect(scope.form.input.$error.lower).toEqual(false);
    expect(scope.form.input.$error.upper).toEqual(false);
    expect(scope.form.input.$error.special).toEqual(false);
    expect(scope.form.input.$error.other).toEqual(false);
    expect(scope.form.input.$error.subset).toEqual(false);
    expect(scope.form.input.$error.identical).toEqual(false);
    expect(scope.form.input.$error.sameas).toEqual(false);
  });
  
  it('should have minlength', function() {
    changeValue('123456789');
    expect(scope.form.input.$error.minlength).toEqual(true);
    changeValue('1234567890');
    expect(scope.form.input.$error.minlength).toEqual(false);
  });
  
  it('should have number', function() {
    changeValue('a');
    expect(scope.form.input.$error.number).toEqual(true);
    changeValue('1');
    expect(scope.form.input.$error.number).toEqual(false);
  });
  
  it('should have upper', function() {
    changeValue('1');
    expect(scope.form.input.$error.upper).toEqual(true);
    changeValue('Q');
    expect(scope.form.input.$error.upper).toEqual(false);
  });
  
  it('should have lower', function() {
    changeValue('1');
    expect(scope.form.input.$error.lower).toEqual(true);
    changeValue('q');
    expect(scope.form.input.$error.lower).toEqual(false);
  });
  
  it('should have special', function() {
    changeValue('a');
    expect(scope.form.input.$error.special).toEqual(true);
    changeValue('~');
    expect(scope.form.input.$error.special).toEqual(false);
  });
  
  it('should have other', function() {
    changeValue('a');
    expect(scope.form.input.$error.other).toEqual(true);
    changeValue('¥');
    expect(scope.form.input.$error.other).toEqual(false);
  });
  
  it('should have identical', function() {
    changeValue('1');
    expect(scope.form.input.$error.identical).toEqual(false);
    changeValue('acb');
    expect(scope.form.input.$error.identical).toEqual(false);
    changeValue('111');
    expect(scope.form.input.$error.identical).toEqual(true);
  });
  
  it('should have sameas', function() {
    changeValue('1');
    expect(scope.form.input.$error.sameas).toEqual(false);
    changeValue('sameas');
    expect(scope.form.input.$error.sameas).toEqual(true);
  });
  
  it('should pass', function() {
    changeValue('Spain12345');
    expect(scope.form.input.$valid).toEqual(true);
    changeValue('_gotMilk85');
    expect(scope.form.input.$valid).toEqual(true);
  });
  
});