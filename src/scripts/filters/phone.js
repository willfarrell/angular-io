/*global format:true */

/*
TODO
- complete country_calling_code
- format based on local - way too complex - http://en.wikipedia.org/wiki/List_of_country_calling_codes
- http://en.wikipedia.org/wiki/Local_conventions_for_writing_telephone_numbers
*/

// phone number {{ value | phone }}
//angular.value('country_calling_code', );
angular.module('io.filters')
.filter('phone', ['$filter', '$locale', function($filter, $locale) {

	/*
	var locale = $locale.id;
	if (locale === 'en-us' || locale === 'en-ca') {
		$locale.PHONE_FORMAT = '(999) 999-9999';
	} else {
		$locale.PHONE_FORMAT = '(999) 999-9999';
	}

	var phone_format = {
		'1': '(999) 999-9999',
		'44': '(999) 9999 9999'
	};
	*/

	var country_calling_code = {'AF':'93','AX':'358','AL':'355','DZ':'213','AS':'684','AD':'376','AO':'244','AI':'264','AQ':'672','AG':'268','AR':'54','AM':'374','AW':'297','AU':'61','AT':'43','AZ':'994','BS':'242','BH':'973','BD':'880','BB':'246','BY':'375','BE':'32','BZ':'501','BJ':'229','BM':'1','BT':'975','BO':'591','BA':'387','BW':'267','BR':'0','IO':'0','BN':'0','BG':'0','BF':'0','BI':'0','KH':'0','CM':'0','CA':'1','CV':'0','KY':'0','CF':'0','TD':'0','CL':'0','CN':'0','CX':'0','CC':'0','CO':'0','KM':'0','CG':'0','CD':'0','CK':'0','CR':'0','CI':'0','HR':'0','CU':'0','CY':'0','CZ':'0','DK':'0','DJ':'0','DM':'0','DO':'0','EC':'0','EG':'0','SV':'0','GQ':'0','ER':'0','EE':'0','ET':'0','FK':'0','FO':'0','FJ':'0','FI':'0','FR':'0','GF':'0','PF':'0','TF':'0','GA':'0','GM':'0','GE':'0','DE':'0','GH':'0','GI':'0','GR':'0','GL':'0','GD':'0','GP':'0','GU':'0','GT':'0','GG':'0','GN':'0','GW':'0','GY':'0','HT':'0','HM':'0','VA':'0','HN':'0','HK':'0','HU':'0','IS':'0','IN':'0','ID':'0','IR':'0','IQ':'0','IE':'0','IM':'0','IL':'0','IT':'0','JM':'0','JP':'0','JE':'0','JO':'0','KZ':'0','KE':'0','KI':'0','KP':'0','KR':'0','KW':'0','KG':'0','LA':'0','LV':'0','LB':'0','LS':'0','LR':'0','LY':'0','LI':'0','LT':'0','LU':'0','MO':'0','MK':'0','MG':'0','MW':'0','MY':'0','MV':'0','ML':'0','MT':'0','MH':'0','MQ':'0','MR':'0','MU':'0','YT':'0','MX':'0','FM':'0','MD':'0','MC':'0','MN':'0','ME':'0','MS':'0','MA':'0','MZ':'0','MM':'0','NA':'0','NR':'0','NP':'0','NL':'0','AN':'0','NC':'0','NZ':'0','NI':'0','NE':'0','NG':'0','NU':'0','NF':'0','MP':'0','NO':'0','OM':'0','PK':'0','PW':'0','PS':'0','PA':'0','PG':'0','PY':'0','PE':'0','PH':'0','PN':'0','PL':'0','PT':'0','PR':'0','QA':'0','RE':'0','RO':'0','RU':'0','RW':'0','BL':'0','SH':'0','KN':'0','LC':'0','MF':'0','PM':'0','VC':'0','WS':'0','SM':'0','ST':'0','SA':'0','SN':'0','RS':'0','SC':'0','SL':'0','SG':'0','SK':'0','SI':'0','SB':'0','SO':'0','ZA':'0','GS':'0','ES':'0','LK':'0','SD':'0','SR':'0','SJ':'0','SZ':'0','SE':'0','CH':'0','SY':'0','TW':'0','TJ':'0','TZ':'0','TH':'0','TL':'0','TG':'0','TK':'0','TO':'0','TT':'0','TN':'0','TR':'0','TM':'0','TC':'0','TV':'0','UG':'0','UA':'0','AE':'0','GB':'44','US':'1','UM':'0','UY':'0','UZ':'0','VU':'0','VE':'0','VN':'0','VG':'0','VI':'0','WF':'0','EH':'0','YE':'0','ZM':'0','ZW':'0'};

	return function(string, country_code) {
		return $filter('format')(string, (country_code ? '+'+country_calling_code[country_code]+' ' : '') + '(999) 999-9999 x999999'); // (phone_format[country_code] || $locale.PHONE_FORMAT) +
	};
}]);
