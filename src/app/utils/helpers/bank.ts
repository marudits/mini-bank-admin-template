import * as moment from 'moment';

import { Bank } from '../../components/bank/bank';

export function formatOfficeHours(bank: Bank): string{
	return `${bank.officeHours[0]} - ${bank.officeHours[1]}`
}

export function formatOfficeDays(bank: Bank): string{
	let formattedOfficeDays = [],
		{ officeDays } = bank;

	const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

	if(officeDays.length > 0){

		officeDays.sort((a, b) => {
			return a - b;
		});

		for (let day of officeDays){
			formattedOfficeDays.push(DAYS[day]);
		}
	}

	return formattedOfficeDays.join(', ');
	
}