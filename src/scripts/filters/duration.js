/*
TODO
- pass now clock into filter???
- week/month option
- add in locale strings
- custom date format
- option to use 'd' instead of 'day', showthand
- passin complete fucntion / str??
*/

angular.module('io.filters')
.filter('duration', ['$filter', function($filter) {
	return function(timestamp) {
		var now = +new Date(),
			Seconds = (now - timestamp)/1000,
			date = new Date(),
			dow = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
			past = (timestamp < now); // is timestamp in the past?

		if (Seconds < 0) { Seconds *= -1; }

		// month

		// week

		// day
		var Days = Math.floor(Seconds / 86400);
		Seconds -= Days * 86400;

		if (past) {
			date = new Date(now - Days * 86400 * 1000);
			if (Days === 1) {
				return 'yesterday '+$filter('pad')(date.getHours(), 2, '0')+':'+$filter('pad')(date.getMinutes(), 2, '0');
			} else if (Days && Days < 7) {
				return dow[date.getDay()]+' '+$filter('pad')(date.getHours(), 2, '0')+':'+$filter('pad')(date.getMinutes(), 2, '0');
			} else if (Days) {
				return date.getFullYear()+'-'+$filter('pad')(date.getMonth(), 2, '0')+'-'+$filter('pad')(date.getDay(), 2, '0')+' '+$filter('pad')(date.getHours(), 2, '0')+':'+$filter('pad')(date.getMinutes(), 2, '0');
			}
		} else if (Days > 1) {
			return Days + ' days';
		} else if (Days === 1) {
			return Days + ' day';
		}

		// hour
		var Hours = Math.floor(Seconds / 3600);
		Seconds -= Hours * (3600);

		if (past && Hours > 3) {
			return $filter('pad')(date.getHours(), 2, '0')+':'+$filter('pad')(date.getMinutes(), 2, '0');
		} else if (Hours > 1) {
			return Hours + ' hours';
		} else if (Hours === 1) {
			return Hours + ' hour';
		}

		// min
		var Minutes = Math.floor(Seconds / 60);
		Seconds -= Minutes * (60);
		if (Minutes > 0) { return (Minutes > 1) ? Minutes + ' minutes': Minutes + ' minute'; }

		// sec
		Seconds = Math.floor(Seconds);
		if (Seconds >= 1) { return (Seconds > 1) ? Seconds + ' seconds': Seconds + ' second'; }

		return '';
	};
}]);

/*


// 10 sec ago, 30 min ago, 10:15, thursday at 10:15, YYYY MMM DD
function formatRelativeDate(timestamp) {
	var now = +new Date(), Seconds = (now - timestamp)/1000;
	if (Seconds < 0) Seconds *= -1;
	var Days = Math.floor(Seconds / 86400);
	Seconds -= Days * 86400;
	if (Days && Days == 1) {
		return 'yesterday hh:mm';
	} else if (Days && Days < 7) {
		return 'day_of_the_week hh:mm';
	} else if (Days) {
		return 'YYYY MMM DD hh:mm'
	}

	var Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);
	if (Hours && Hours > 3) {
		return 'hh:mm';
	} else if (Hours) {
		return (Hours > 1) ? Hours + ' hours ': Hours + ' hour ';
	}

	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);
	if (Minutes > 0) { return (Minutes > 1) ? Minutes + ' minutes ': Minutes + ' minute '; }
	if (Seconds > 0) { return (Seconds > 1) ? Seconds + ' seconds ': Seconds + ' second '; }
	return 'zero';
}

// 6 days till end
function formatCountdown(timestamp) {
	var now = +new Date(), Seconds = (timestamp - now)/1000;
	if (Seconds < 0) Seconds *= -1;
	var Days = Math.floor(Seconds / 86400);
	Seconds -= Days * 86400;
	if (Days > 0) { return (Days > 1) ? Days + ' days ': Days + ' day '; }

	var Hours = Math.floor(Seconds / 3600);
	Seconds -= Hours * (3600);
	if (Hours > 0) { return (Hours > 1) ? Hours + ' hours ': Hours + ' hour '; }

	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);
	if (Minutes > 0) { return (Minutes > 1) ? Minutes + ' minutes ': Minutes + ' minute '; }
	if (Seconds > 0) { return (Seconds > 1) ? Seconds + ' seconds ': Seconds + ' second '; }
	return 'zero';
}

*/