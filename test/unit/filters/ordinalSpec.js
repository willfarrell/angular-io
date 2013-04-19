/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('ordinal', function() {
  var ordinalFilter;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    ordinalFilter = $filter('ordinal');
  }));

  it('should append ordinal to number', function() {
    expect(ordinalFilter(1)).toEqual('1st');
    expect(ordinalFilter(2)).toEqual('2nd');
    expect(ordinalFilter(3)).toEqual('3rd');
    expect(ordinalFilter(4)).toEqual('4th');
    expect(ordinalFilter(10)).toEqual('10th');
  });
  
  it('should append ordinal to number string', function() {
    expect(ordinalFilter('1')).toEqual('1st');
    expect(ordinalFilter('2')).toEqual('2nd');
    expect(ordinalFilter('3')).toEqual('3rd');
    expect(ordinalFilter('4')).toEqual('4th');
    expect(ordinalFilter('10')).toEqual('10th');
  });
});