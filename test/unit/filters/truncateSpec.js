/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('truncate', function() {
  var truncateFilter;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    truncateFilter = $filter('truncate');
  }));

  it('should shorten a string', function() {
    expect(truncateFilter('')).toEqual('');
    expect(truncateFilter('', 2)).toEqual('');
    expect(truncateFilter('', 2, '---')).toEqual('');
    
    expect(truncateFilter('12345')).toEqual('12345');
    expect(truncateFilter('12345', 5)).toEqual('12345');
    expect(truncateFilter('12345', 5, '---')).toEqual('12345');
    
    expect(truncateFilter('12345678901234567890')).toEqual('1234567...');
    expect(truncateFilter('12345678901234567890', 5)).toEqual('12...');
    expect(truncateFilter('12345678901234567890', 5, '---')).toEqual('12---');
  });
});