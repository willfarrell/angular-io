/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('passwordCheck', function() {
  var $compile, $rootScope,
      html, element, scope, changeValue;
  
  beforeEach(module('io.filters'));
  beforeEach(module('io.directives'));
  beforeEach(inject(function($rootScope, $compile) {
    // setup
    html = '<form name="form"><input type="text" name="input" data-ng-model="inputValue" data-sameas="sameas" data-password-check required></form>';
    element = angular.element(html);
    scope = $rootScope;
    element = $compile(element)(scope);
    scope.$digest();
    
    // change model
    changeValue = function(val) {
      scope.$apply(function() {
        scope.inputValue = val;
      });
      //scope.$digest();
    };
  }));
  
  it('should multiple error params', function() {
    changeValue('');
    expect(scope.form.input.$error.required).toEqual(true);
    expect(scope.form.input.$error.minlength).toEqual(false);
    expect(scope.form.input.$error.number).toEqual(false);
    expect(scope.form.input.$error.lower).toEqual(false);
    expect(scope.form.input.$error.upper).toEqual(false);
    expect(scope.form.input.$error.special).toEqual(false);
    expect(scope.form.input.$error.other).toEqual(false);
    expect(scope.form.input.$error.subset).toEqual(false);
    expect(scope.form.input.$error.identical).toEqual(false);
    expect(scope.form.input.$error.sameas).toEqual(false);
    
    changeValue('¥');
    expect(scope.form.input.$error.required).toEqual(false);
    expect(scope.form.input.$error.minlength).toEqual(true);
    expect(scope.form.input.$error.number).toEqual(true);
    expect(scope.form.input.$error.lower).toEqual(true);
    expect(scope.form.input.$error.upper).toEqual(true);
    expect(scope.form.input.$error.special).toEqual(true);
    expect(scope.form.input.$error.other).toEqual(false);
    expect(scope.form.input.$error.subset).toEqual(true);
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
    changeValue('1');
    expect(scope.form.input.$error.number).toEqual(false);
  });
  
  it('should have upper', function() {
    changeValue('Q');
    expect(scope.form.input.$error.upper).toEqual(false);
  });
  
  it('should have lower', function() {
    changeValue('q');
    expect(scope.form.input.$error.lower).toEqual(false);
  });
  
  it('should have special', function() {
    changeValue('~');
    expect(scope.form.input.$error.special).toEqual(false);
  });
  
  it('should have other', function() {
    changeValue('¥');
    //console.log(form.$error);
    expect(scope.form.input.$error.other).toEqual(false);
  });
  
  it('should have identical', function() {
    changeValue('111');
    expect(scope.form.input.$error.identical).toEqual(true);
  });
  
  it('should have sameas', function() {
    changeValue('sameas');
    //console.log(form.$error);
    expect(scope.form.input.$error.sameas).toEqual(true);
  });
  
});