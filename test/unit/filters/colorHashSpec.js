describe('colorHash', function() {
  var colorHashFilter;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    colorHashFilter = $filter('colorHash');
  }));

  /*it('should prepend padding to a string', function() {
    expect(colorHashFilter('').length).toEqual(6);
    expect(colorHashFilter('0000000').length).toEqual(6);
    expect(colorHashFilter('00000000000000').length).toEqual(6);
  });*/
});