import * as moment from 'moment';

export function calculateDiffTime(time) {
	let diffTime = moment().diff(moment(time)),
		sentTime = new Date(time);

	let countDays =  moment.utc(diffTime).dayOfYear() - 1,
		countHours = moment.utc(diffTime).hour(),
		countMinutes = moment.utc(diffTime).minute();

	if(countDays > 1){
		return moment(sentTime).format('D MMM YYYY').toString();
	} else if(countDays === 1){
		return 'Yesterday';
	} else {
		if(countHours >= 1){
			return `${countHours}h ago`;
		} else {
			return `${countMinutes}m ago`;
		}
	}
}

export function isValidHourMinute(time: string){
	return time.split(':').length === 2;
}

export function isTimeOverlap(start: string, end: string){
	let timeStart = start.split(':'),
		timeEnd = end.split(':');

	let hourMinuteStart = new Date();
	hourMinuteStart.setHours(parseInt(timeStart[0]));
	hourMinuteStart.setMinutes(parseInt(timeStart[1]));

	let hourMinuteEnd = new Date();
	hourMinuteEnd.setHours(parseInt(timeEnd[0]));
	hourMinuteEnd.setMinutes(parseInt(timeEnd[1]));

	return hourMinuteStart.getTime() >= hourMinuteEnd.getTime();
}