describe('duration', function() {
  var durationFilter,
  	  now,
  	  dow = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];;

  beforeEach(module('io.filters'));
  beforeEach(inject(function($filter) {
    durationToPastFilter = $filter('durationToPast');
    durationToFutureFilter = $filter('durationToFuture');
  }));
  
  now = +new Date();
  date = new Date();
  
  it('should return the duration from now to the past', function() {
    expect(durationToPastFilter((now - 0 * 1000))).toEqual('zero');
    expect(durationToPastFilter((now - 1 * 1000))).toEqual('1 second');
    expect(durationToPastFilter((now - 2 * 1000))).toEqual('2 seconds');
    expect(durationToPastFilter((now - 1 * 60 * 1000))).toEqual('1 minute');
    expect(durationToPastFilter((now - 2 * 60 * 1000))).toEqual('2 minutes');
    expect(durationToPastFilter((now - 1 * 60 * 60 * 1000))).toEqual('1 hour');
    expect(durationToPastFilter((now - 2 * 60 * 60 * 1000))).toEqual('2 hours');
    
    date = new Date(now - 1 * 24 * 60 * 60 * 1000);
    expect(durationToPastFilter((now - 1 * 24 * 60 * 60 * 1000))).toEqual('yesterday '+date.getHours()+':'+date.getMinutes());
    
    date = new Date(now - 3 * 24 * 60 * 60 * 1000);
    expect(durationToPastFilter((now - 3 * 24 * 60 * 60 * 1000))).toEqual(dow[date.getDay()]+' '+date.getHours()+':'+date.getMinutes());
  });
  
  it('should return the duration from now to the future', function() {
    expect(durationToFutureFilter((now - 0 * 1000))).toEqual('zero');
    expect(durationToFutureFilter((now - 1 * 1000))).toEqual('1 second');
    expect(durationToFutureFilter((now - 2 * 1000))).toEqual('2 seconds');
    expect(durationToFutureFilter((now - 1 * 60 * 1000))).toEqual('1 minute');
    expect(durationToFutureFilter((now - 2 * 60 * 1000))).toEqual('2 minutes');
    expect(durationToFutureFilter((now - 1 * 60 * 60 * 1000))).toEqual('1 hour');
    expect(durationToFutureFilter((now - 2 * 60 * 60 * 1000))).toEqual('2 hours');
    expect(durationToFutureFilter((now - 1 * 24 * 60 * 60 * 1000))).toEqual('1 day');
    expect(durationToFutureFilter((now - 2 * 24 * 60 * 60 * 1000))).toEqual('2 days');
  });
});