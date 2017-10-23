import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

//Library
import * as $ from 'jquery';
import 'rxjs/add/operator/switchMap';

//Component
import { Bank } from './bank';

//Services
import { BankService } from '../../utils/services/bank.service';

//Utils
import { showToast } from '../../utils/helpers/dialog';
import { isValidHourMinute, isTimeOverlap } from '../../utils/helpers/dateAndTime';




@Component({
	selector: 'bank-form',
	templateUrl: './bank-form.component.html'
})

export class BankForm {
	private bank: Bank;

	private days: Object[] = [
		{id: 1, name: 'Monday'},
		{id: 2, name: 'Tuesday'},
		{id: 3, name: 'Wednesday'},
		{id: 4, name: 'Thursday'},
		{id: 5, name: 'Friday'},
		{id: 6, name: 'Saturday'},
		{id: 0, name: 'Sunday'}
	];

	constructor(
		private bankService: BankService, 
		private router: Router,
		private activatedRouted: ActivatedRoute,
		private location: Location
		){
		let bank = {
			id: -1,
			name: '',
			address: '',
			phone: '',
			location: {
				lat: '',
				lng: ''
			},
			rating: 0,
			favourites: 0,
			officeHours: ['09:00', '17:00'],
			officeDays: [1,2,3,4,5],
			createdAt: (new Date()).toString(),
			updatedAt: (new Date()).toString()
		}

		this.bank = bank;
	}

	ngOnInit(): void{
		if(this.router.url !== '/bank/add'){
			this.activatedRouted.paramMap
				.switchMap((params: ParamMap) => this.bankService.getDetail(+params.get('id')))
				.subscribe(bank => {
					this.bank = bank
				});	
		}
		
	}

	private goBack(): void {
		this.location.back();
	}


	private handleError(err: any): void{
		console.error(err);
	}

	private validateForm(formData: Bank): Boolean {
		let {name, address, location, phone, officeHours, officeDays} = this.bank;

		//validate name
		if(name.trim() === ''){
			showToast(`Name shouldn't be empty`);
			return false;
		}

		//validate address
		if(address.trim() === ''){
			showToast(`Address shouldn't be empty`);
			return false;
		}

		//validate coordinates
		const coordsRule = /^(\-)?(0|[1-9])\d*((\.|\,)\d+)?$/;
		let {lat, lng} = location;
		if(!lat.toString().match(coordsRule) || !lng.toString().match(coordsRule)){
			showToast(`Latitude or Longitude should be number or decimal`);
			return false;
		}

		lat = lat.toString().replace(',', '.');
		lng = lng.toString().replace(',', '.');

		if(parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lng) < -180 || parseFloat(lng) > 180){
			showToast(`Range value of Latitude or Longitude are wrong`);
			return false;	
		}

		//validate officeHours
		const hourOpen = officeHours[0],
			hourClose = officeHours[1];

		if(!isValidHourMinute(hourOpen) || !isValidHourMinute(hourClose)){
			showToast(`Format of time should be hh:mm`);
			return false;
		}

		if(isTimeOverlap(hourOpen, hourClose)){
			showToast(`Open time shouldn't be overlap with close time`);
			return false;
		}

		//validate officeDays
		if(officeDays.length <= 0){
			showToast(`Office days shouldn't be empty`);
			return false;
		}

		//validate phone
		let phoneRule = /^\+?\d{7,14}$/ 
		if(!phone.match(phoneRule)){
			showToast(`Wrong format for phone number`);
			return false;
		}

		return true;
	}

	

	private submitForm(): void {

		let formData = Object.assign({}, this.bank, {officeDays: $('#bank-officedays').val()});
		console.log('formData: ', formData, '| officeDays: ', $('#bank-officedays').val());

		if(this.validateForm(formData)){
			let that = this;

			//add data
			if(formData.id === -1){
				delete formData.id;

				

				this.bankService.addData(formData)
					.then((item) => {
						console.log('New added bank: ', item);
						that.router.navigate(['/bank']);
						})
					.catch(this.handleError);

			//update data
			} else if (!isNaN(formData.id)) {
				formData.updatedAt = (new Date()).toString();

				console.log('Updating data: ', formData);

				this.bankService.updateData(formData)
					.then((item) => {
						console.log('Updated bank: ', item);
						that.router.navigate(['/bank']);
						})
					.catch(this.handleError);
			}

			
		}
		
		

	}

}