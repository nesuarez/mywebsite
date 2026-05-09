/**
 * Main application script
 * Includes email obfuscation, language toggle, and clock updates
 */

window.onload = function() {
	document.body.classList.remove('is-preload');
	
	// Email obfuscation: Characters stored as ASCII codes
	// Decodes to: ed@nesuarez.com
	const emailChars = [101, 100, 64, 110, 101, 115, 117, 97, 114, 101, 122, 46, 99, 111, 109];
	let email = '';
	for (let i = 0; i < emailChars.length; i++) {
		email += String.fromCharCode(emailChars[i]);
	}
	document.getElementById('email-link').href = 'mailto:' + email;
}

window.onorientationchange = function() {
	document.body.scrollTop = 0;
}

function toggleLang() {
	var isEs = document.body.classList.toggle('es');
	document.title = isEs ? 'Sitio Personal nesuarez' : 'Personal Web Site nesuarez';
	document.documentElement.lang = isEs ? 'es' : 'en';
	localStorage.setItem('lang', isEs ? 'es' : 'en');
}

(function() {
	if (localStorage.getItem('lang') === 'es') {
		document.body.classList.add('es');
		document.title = 'Sitio Personal nesuarez';
		document.documentElement.lang = 'es';
	}
})();

function pad(n) {
	return String(n).padStart(2, '0');
}

function updateClocks() {
	var now = new Date();
	document.getElementById('clock-utc').textContent =
		pad(now.getUTCHours()) + ':' + pad(now.getUTCMinutes()) + ':' + pad(now.getUTCSeconds());
	
	var berlinFmt = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Europe/Berlin',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});
	document.getElementById('clock-cet').textContent = berlinFmt.format(now);
	
	var berlinHour = parseInt(new Intl.DateTimeFormat('en-US', {
		timeZone: 'Europe/Berlin',
		hour: 'numeric',
		hour12: false
	}).format(now));
	
	var offset = (berlinHour - now.getUTCHours() + 24) % 24;
	document.getElementById('clock-cet-label').textContent = offset === 2 ? 'CEST' : 'CET';
}

updateClocks();
setInterval(updateClocks, 1000);
