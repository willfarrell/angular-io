var IE = /*@cc_on!@*/!1;
if (IE) {
	IE = parseFloat((/MSIE[\s]*([\d\.]+)/).exec(navigator.appVersion)[1]);
	// Check if chromeframe, reset IE var if so
	if(IE < 10 && (/chromeframe/).test(navigator.appVersion)) { IE = 0; }
}