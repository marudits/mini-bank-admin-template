import { Component, OnInit, DoCheck, Input } from '@angular/core';

import { formatOfficeHours, formatOfficeDays } from '../../utils/helpers/bank';

@Component({
	selector: 'bank-detail',
	templateUrl: './bank-detail.component.html'
})

export class BankDetail {
	@Input()data;
	private bankInfo;

	private table = {
		header: ['ID', 'Name', 'Address', 'Office Hours', 'Office Days'],
		column: ['id', 'name', 'address', 'formattedOfficeHours', 'formattedOfficeDays']
	}

	constructor(){}

	ngDoCheck(): void {
		this.setBankInfo();
	}

	setBankInfo(): void {
		this.bankInfo = Object.assign({}, this.data,
			{formattedOfficeHours: formatOfficeHours(this.data)},
			{formattedOfficeDays: formatOfficeDays(this.data)}
		);
	}

}