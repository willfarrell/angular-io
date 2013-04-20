/*
Requires:
- lang: en, fr, nl

TODO
- add more i18n
- strip out i18n
*/

angular.module('io.filters')
.filter('ordinal', ['$locale', function($locale) {
	
	// http://en.wikipedia.org/wiki/Ordinal_indicator
	// locale - http://typophile.com/node/42577
	var lang = $locale.id.substr(0,2);
	if (lang === 'en') {						// English
		$locale.ordinal = ['th','st','nd','rd'];
	} else if (lang === 'fr') {					// French
		$locale.ordinal = ['ème','er','e','e'];
	} else if (lang === 'nl') {					// Dutch
		$locale.ordinal = ['e'];
	//} else if (lang === 'pl') {					// Polish
	//	$locale.ordinal = ['','','',''];
	// Galician, Italian, Portuguese, and Spanish
	// \u00BA or \u00AA
	} else {
		$locale.ordinal = ['','','',''];
	}
	
	// load in locale
	var append = $locale.ordinal;
	
	return function(num) {
		if (parseFloat(num) === parseInt(num, 10) && !isNaN(num)) {
			var value=num%100;
			return num + (append[(value-20)%10] || append[value] || append[0]); // calc || 1st,2nd,3rd || #th
		}
		return num;
	};
}]);