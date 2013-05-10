/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('format', function() {
  var formatFilter, phoneFormatFilter;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
	formatFilter = $filter('format');
	phoneFormatFilter = $filter('phone');
  }));

  it('should format a string', function() {
	expect(formatFilter('aaa')).toEqual('aaa');
	expect(formatFilter('A1A1A1', 'a9a-9a9')).toEqual('A1A-1A1');
	expect(formatFilter('A1  r', 'a9 sw')).toEqual('A1  r');
	expect(formatFilter('12345678909999', '(999) 999-9999 x9999999')).toEqual('(123) 456-7890 x9999');
	expect(formatFilter(12345678909999, '(999) 999-9999 x9999999')).toEqual('(123) 456-7890 x9999');
  });

  it('should format a phone number', function() {
	expect(phoneFormatFilter(1234567890)).toEqual('(123) 456-7890');
	expect(phoneFormatFilter(12345678909999)).toEqual('(123) 456-7890 x9999');
  });
});