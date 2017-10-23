import { Component, DoCheck, Input } from '@angular/core';

//Helpers
import { calculateDiffTime } from '../../utils/helpers/dateAndTime';

@Component({
	selector: 'rating-detail',
	templateUrl: './rating-detail.component.html'
})

export class RatingDetail {
	@Input()data;
	private formattedInfo;

	private table: Object = {
		header: ['ID', 'Name', 'Bank', 'Value', 'Text', 'Created At'],
		column: ['id', 'name', 'bankName', 'value', 'text', 'createdAt']
	}

	constructor(){}

	ngDoCheck(): void {
		this.setRatingInfo();
	}

	private setRatingInfo(): void {
		this.formattedInfo = Object.assign({},
			this.data,
			//{createdAt: calculateDiffTime(this.data.createdAt)}
		);
	}
}

