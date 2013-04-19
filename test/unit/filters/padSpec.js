describe('pad', function() {
  var padFilter;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    padFilter = $filter('pad');
  }));

  it('should prepend padding to a string', function() {
    expect(padFilter(1)).toEqual('1');
    expect(padFilter('2')).toEqual('2');
    expect(padFilter('1', 2)).toEqual(' 1');
    expect(padFilter('1', 2, '-')).toEqual('-1');
    expect(padFilter('1', 3, '-')).toEqual('--1');
    expect(padFilter('1', 2, '-', true)).toEqual('1-');
    expect(padFilter('1', 3, '-', true)).toEqual('1--');
  });
});