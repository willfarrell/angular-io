/*globals describe:true, beforeEach:true, inject:true, it:true, expect:true */

describe('duration', function() {
	var durationFilter,
		now, date, filter,
		dow = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

	beforeEach(module('io.filters'));
	beforeEach(inject(function($filter) {
		filter = $filter
		durationFilter = $filter('duration');
	}));

	date = new Date();

	it('should return the duration from now to the past', function() {
		now = +new Date();
		expect(durationFilter((now - 0 * 1000))).toEqual('');
		now = +new Date();
		expect(durationFilter((now - 1 * 1000))).toEqual('1 second');
		now = +new Date();
		expect(durationFilter((now - 5 * 1000))).toEqual('5 seconds');
		expect(durationFilter((now - 1 * 60 * 1000))).toEqual('1 minute');
		expect(durationFilter((now - 2 * 60 * 1000))).toEqual('2 minutes');
		expect(durationFilter((now - 1 * 60 * 60 * 1000))).toEqual('1 hour');
		expect(durationFilter((now - 2 * 60 * 60 * 1000))).toEqual('2 hours');
		expect(durationFilter((now - 5 * 60 * 60 * 1000))).toEqual(filter('pad')(date.getHours(), 2, '0')+':'+filter('pad')(date.getMinutes(), 2, '0'));

		date = new Date(now - 1 * 24 * 60 * 60 * 1000);
		expect(durationFilter((now - 1 * 24 * 60 * 60 * 1000))).toEqual('yesterday '+filter('pad')(date.getHours(), 2, '0')+':'+filter('pad')(date.getMinutes(), 2, '0'));

		date = new Date(now - 3 * 24 * 60 * 60 * 1000);
		expect(durationFilter((now - 3 * 24 * 60 * 60 * 1000))).toEqual(dow[date.getDay()]+' '+filter('pad')(date.getHours(), 2, '0')+':'+filter('pad')(date.getMinutes(), 2, '0'));

		date = new Date(now - 7 * 24 * 60 * 60 * 1000);
		expect(durationFilter((now - 7 * 24 * 60 * 60 * 1000))).toEqual(date.getFullYear()+'-'+filter('pad')(date.getMonth(), 2, '0')+'-'+filter('pad')(date.getDay(), 2, '0')+' '+filter('pad')(date.getHours(), 2, '0')+':'+filter('pad')(date.getMinutes(), 2, '0'));
	});

	// since this is related to future, slower computers may fail here (+1sec to counter this)
	it('should return the duration from now to the future', function() {
		now = +new Date();
		expect(durationFilter((now + 0 * 1000))).toEqual('');
		now = +new Date();
		expect(durationFilter((now + 1 * 1000))).toEqual('1 second');
		now = +new Date();
		expect(durationFilter((now + 5 * 1000))).toEqual('5 seconds');
		expect(durationFilter((now + 1 * 60 * 1000 + 5000))).toEqual('1 minute');
		expect(durationFilter((now + 2 * 60 * 1000 + 5000))).toEqual('2 minutes');
		expect(durationFilter((now + 1 * 60 * 60 * 1000 + 5000))).toEqual('1 hour');
		expect(durationFilter((now + 2 * 60 * 60 * 1000 + 5000))).toEqual('2 hours');
		expect(durationFilter((now + 1 * 24 * 60 * 60 * 1000 + 5000))).toEqual('1 day');
		expect(durationFilter((now + 2 * 24 * 60 * 60 * 1000 + 5000))).toEqual('2 days');
		//expect(durationFilter((now + 7 * 24 * 60 * 60 * 1000))).toEqual('1 week');
		//expect(durationFilter((now + 14 * 24 * 60 * 60 * 1000))).toEqual('2 weeks');
		//expect(durationFilter((now + 30 * 24 * 60 * 60 * 1000))).toEqual('1 month');
		//expect(durationFilter((now + 60 * 24 * 60 * 60 * 1000))).toEqual('2 months');
	});
});