// use jasmine.Clock.tick(101); ??
describe('time', function() {
	var timeFactory;

	beforeEach(module('io.factories'));

	it('should contain default values', inject(function($time) {
		expect($time.get()).toEqual(0);
	}));

	it('should set a time interval', inject(function($time) {
		$time.set();
		expect($time.get()/1000).toBeCloseTo((+new Date())/1000, 0);

		$time.set(60);
		window.setTimeout(function() {
			expect($time.get()/1000).toBeCloseTo(((+new Date())+60)/1000, 0);
		}, 60);

	}));
});