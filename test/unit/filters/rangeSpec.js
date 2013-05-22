describe('range', function() {
	var rangeFilter;

	beforeEach(module('io.filters'));
	beforeEach(inject(function($filter) {
		rangeFilter = $filter('range');
	}));

	it('should return a array of number strings', function() {
		expect(rangeFilter([], 0,6,3)).toEqual(['0','3','6']);
		expect(rangeFilter([], 1,3,null)).toEqual(['1','2','3']);
		expect(rangeFilter([], 2,1)).toEqual(['1','2']);
		expect(rangeFilter([], 2)).toEqual(['0','1','2']);
	});
});