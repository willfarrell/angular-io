describe('colorHash', function() {
	var colorHashFilter;

	beforeEach(module('io.filters'));
	beforeEach(inject(function($filter) {
		colorHashFilter = $filter('colorHash');
	}));

	it('should always be of length 6', function() {
		expect(colorHashFilter('').length).toEqual(6);
		expect(colorHashFilter('0000000').length).toEqual(6);
		expect(colorHashFilter('00000000000000').length).toEqual(6);
	});

	it('should prepend padding to a string', function() {
		expect(colorHashFilter('')).toEqual('000000');
		expect(colorHashFilter('0000000')).toEqual('ceae30');
		expect(colorHashFilter('00000000000000')).toEqual('2f8aa0');
	});
});