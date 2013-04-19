describe('duration', function() {
  var durationFilter,
  	  now,
  	  dow = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    durationToPastFilter = $filter('durationToPast');
    durationToFutureFilter = $filter('durationToFuture');
    durationFilter = $filter('duration');
  }));
  
  date = new Date();
  
  it('should return the duration from now to the past', function() {
  	now = +new Date();
    expect(durationFilter((now - 0 * 1000))).toEqual('zero');
    expect(durationFilter((now - 1 * 1000))).toEqual('1 second');
    expect(durationFilter((now - 2 * 1000))).toEqual('2 seconds');
    expect(durationFilter((now - 1 * 60 * 1000))).toEqual('1 minute');
    expect(durationFilter((now - 2 * 60 * 1000))).toEqual('2 minutes');
    expect(durationFilter((now - 1 * 60 * 60 * 1000))).toEqual('1 hour');
    expect(durationFilter((now - 2 * 60 * 60 * 1000))).toEqual('2 hours');
    expect(durationFilter((now - 5 * 60 * 60 * 1000))).toEqual(date.getHours()+':'+date.getMinutes());
    
    date = new Date(now - 1 * 24 * 60 * 60 * 1000);
    expect(durationFilter((now - 1 * 24 * 60 * 60 * 1000))).toEqual('yesterday '+date.getHours()+':'+date.getMinutes());
    
    date = new Date(now - 3 * 24 * 60 * 60 * 1000);
    expect(durationFilter((now - 3 * 24 * 60 * 60 * 1000))).toEqual(dow[date.getDay()]+' '+date.getHours()+':'+date.getMinutes());
    
    date = new Date(now - 7 * 24 * 60 * 60 * 1000);
    expect(durationFilter((now - 7 * 24 * 60 * 60 * 1000))).toEqual(date.getFullYear()+' '+date.getMonth()+' '+date.getDay()+' '+date.getHours()+':'+date.getMinutes());
  });
  
  
  it('should return the duration from now to the future', function() {
  	now = +new Date();
    expect(durationFilter((now + 0 * 1000))).toEqual('zero');
    expect(durationFilter((now + 1 * 1000))).toEqual('1 second');
    expect(durationFilter((now + 5 * 1000))).toEqual('5 seconds');
    expect(durationFilter((now + 1 * 60 * 1000))).toEqual('1 minute');
    expect(durationFilter((now + 2 * 60 * 1000))).toEqual('2 minutes');
    expect(durationFilter((now + 1 * 60 * 60 * 1000))).toEqual('1 hour');
    expect(durationFilter((now + 2 * 60 * 60 * 1000))).toEqual('2 hours');
    expect(durationFilter((now + 1 * 24 * 60 * 60 * 1000))).toEqual('1 day');
    expect(durationFilter((now + 2 * 24 * 60 * 60 * 1000))).toEqual('2 days');
    //expect(durationFilter((now + 7 * 24 * 60 * 60 * 1000))).toEqual('1 week');
    //expect(durationFilter((now + 14 * 24 * 60 * 60 * 1000))).toEqual('2 weeks');
    //expect(durationFilter((now + 30 * 24 * 60 * 60 * 1000))).toEqual('1 month');
    //expect(durationFilter((now + 60 * 24 * 60 * 60 * 1000))).toEqual('2 months');
  });
});