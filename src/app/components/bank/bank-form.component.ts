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
	templateUrl: './bank-form.component.html',
	styleUrls: ['./bank-form.component.scss']
})

export class BankForm {
	private bank: Bank;

	//masking
	timeMask = {
		mask: [/\d/, /\d/,
		':', /\d/, /\d/]
	};

	private days: Object[] = [
		{id: 1, name: 'Mon'},
		{id: 2, name: 'Tue'},
		{id: 3, name: 'Wed'},
		{id: 4, name: 'Thu'},
		{id: 5, name: 'Fri'},
		{id: 6, name: 'Sat'},
		{id: 0, name: 'Sun'}
	];

	private validation = {
		name: {
			status: 'default',
			message: ''
		},
		address: {
			status: 'default',
			message: ''
		},
		location: {
			status: 'default',
			message: ''
		},
		officeHours: {
			status: 'default',
			message: ''
		},
		officeDays: {
			status: 'default',
			message: ''
		},
		phone: {
			status: 'default',
			message: ''
		}
	}

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
		if(this.router.url !== '/app/bank/add'){
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
			this.validation.name.status = 'error';
			this.validation.name.message = `Name shouldn't be empty`;
			return false;
		} else {
			this.validation.name.status = 'success';
			this.validation.name.message = '';
		}

		//validate address
		if(address.trim() === ''){
			this.validation.address.status = 'error';
			this.validation.address.message = `Address shouldn't be empty`;
			return false;
		} else {
			this.validation.address.status = 'success';
			this.validation.address.message = '';
		}

		//validate coordinates
		const coordsRule = /^(\-)?(0|[1-9])\d*((\.|\,)\d+)?$/;
		let {lat, lng} = location;
		if(!lat.toString().match(coordsRule) || !lng.toString().match(coordsRule)){
			this.validation.location.status = 'error';
			this.validation.location.message = `Latitude or Longitude should be number or decimal`;
			return false;
		} else {
			this.validation.location.status = 'success';
			this.validation.location.message = '';
		}

		lat = lat.toString().replace(',', '.');
		lng = lng.toString().replace(',', '.');

		if(parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lng) < -180 || parseFloat(lng) > 180){
			this.validation.location.status = 'error';
			this.validation.location.message = `Range value of Latitude or Longitude are wrong`;
			return false;	
		} else {
			this.validation.location.status = 'success';
			this.validation.location.message = '';
		}

		//validate officeHours
		const hourOpen = officeHours[0],
			hourClose = officeHours[1];

		if(!isValidHourMinute(hourOpen) || !isValidHourMinute(hourClose)){
			this.validation.officeHours.status = 'error';
			this.validation.officeHours.message = `Format of time should be hh:mm`;
			return false;
		} else {
			this.validation.officeHours.status = 'success';
			this.validation.officeHours.message = '';
		}

		if(isTimeOverlap(hourOpen, hourClose)){
			this.validation.officeHours.status = 'error';
			this.validation.officeHours.message = `Open time shouldn't be overlap with close time`;
			return false;
		} else {
			this.validation.officeHours.status = 'success';
			this.validation.officeHours.message = '';
		}

		//validate officeDays
		if(officeDays.length <= 0){
			this.validation.officeDays.status = 'error';
			this.validation.officeDays.message = `Office days shouldn't be empty`;
			return false;
		} else {
			this.validation.officeDays.status = 'success';
			this.validation.officeDays.message = '';
		}

		//validate phone
		let phoneRule = /^\+?\d{7,14}$/ 
		if(!phone.match(phoneRule)){
			this.validation.phone.status = 'error';
			this.validation.phone.message = `Wrong format for phone number`;
			return false;
		} else {
			this.validation.phone.status = 'success';
			this.validation.phone.message = '';
		}

		//return true;
		return false;
	}

	

	private submitForm(): void {
		let officeDaysElm = $('.bank-officedays:checked'),
			officeDays = [];
		
		officeDaysElm.map((i, x) => {
			officeDays.push(x.value);
		});

		this.bank.officeDays = officeDays;

		let formData = Object.assign({}, this.bank, {officeDays: officeDays});
		console.log('formData: ', formData, '| officeDays: ', officeDays);

		if(this.validateForm(formData)){
			let that = this;

			//add data
			if(formData.id === -1){
				delete formData.id;

				

				this.bankService.addData(formData)
					.then((item) => {
						console.log('New added bank: ', item);
						that.router.navigate(['app', 'bank']);
						})
					.catch(this.handleError);

			//update data
			} else if (!isNaN(formData.id)) {
				formData.updatedAt = (new Date()).toString();

				console.log('Updating data: ', formData);

				this.bankService.updateData(formData)
					.then((item) => {
						console.log('Updated bank: ', item);
						that.router.navigate(['app', 'bank']);
						})
					.catch(this.handleError);
			}

			
		}
		
		

	}

}