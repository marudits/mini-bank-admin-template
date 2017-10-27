import { Component, Input } from '@angular/core';

@Component({
	selector: 'card-bank-overview',
	templateUrl: './card-bank-overview.html',
	styleUrls: ['./card-bank-overview.scss']
})

export class CardBankOverview{
	@Input()data: Object;

	

	constructor(){}
}
