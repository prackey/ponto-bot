function pad(num) {
	return ('0' + num).slice(-2);
}

exports.hhmmss = function (secs) {
	let minutes = Math.floor(secs / 60);
	secs = secs % 60;

	const hours = Math.floor(minutes / 60);
	minutes = minutes % 60;

	return `${pad(hours)} Horas, ${pad(minutes)} Minutos e ${pad(secs)} segundos`;
};
