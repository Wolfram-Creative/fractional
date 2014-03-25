angular.module('dateTimeFilters', [])
	.filter('duration', function() {
		return function(ms) {
			var formatted_time,
				seconds = parseInt(ms/1000, 10),
				minutes = parseInt(ms/1000/60, 10),
				hours = parseInt(ms/1000/60/60, 10),
				days = Number(ms/1000/60/60/24, 10).toFixed(0),
				ms_loc = "ms",
				seconds_loc = "sec",
				minutes_loc = "min",
				hours_loc = "hours",
				days_loc = "days";
			if (seconds < 1) {
				formatted_time = ms + ' ' + ms_loc;
			}
			if (seconds >= 1 && seconds < 60) {
				formatted_time = seconds + ' ' + seconds_loc;
			}
			if (minutes >= 1 && minutes < 60) {
				leftover_seconds = seconds - (60 * minutes);
				formatted_time = minutes + ' ' + minutes_loc;
				if (leftover_seconds) {
					formatted_time += ', ' + leftover_seconds + ' ' + seconds_loc;
				}
			}
			if (hours >= 1 && hours < 24) {
				var leftover_minutes = minutes - (60 * hours),
					leftover_seconds = seconds - (60 * leftover_minutes);
				formatted_time = hours + ' ' + minutes_loc;
				if (leftover_minutes) {
					formatted_time += ', ' + leftover_minutes + ' ' + minutes_loc;
				}
				if (leftover_seconds) {
					formatted_time += ', ' + leftover_seconds + ' ' + seconds_loc;
				}
			}
			if (days >= 1) {
				formatted_time = days + ' ' + days_loc;
			}
			return formatted_time;
		};
	});
