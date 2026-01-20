export function formatUptime(seconds: number) {
	function pad(s: number) {
		return (s < 10 ? "0" : "") + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor((seconds % (60 * 60)) / 60);
	var secs = Math.floor(seconds % 60);
	return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

export function formattedMemoryUsage() {
	return `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`;
}
