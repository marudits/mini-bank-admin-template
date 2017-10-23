import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Library
import * as $ from 'jquery';
window['jQuery'] = window['$'] = $;
import 'bootstrap';

@Component({
	selector: 'page-bank',
	templateUrl: './index.html',
	styleUrls: ['./index.scss']
})
export class BankPage {
	private modalBankForm: string = '#modal-bank-form';
	constructor(private router: Router){
		
	}

	private openForm(): void {
		console.log($(this.modalBankForm));
		$(this.modalBankForm).modal('open');
	}

}