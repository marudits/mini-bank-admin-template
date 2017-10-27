import { Component, OnInit } from '@angular/core';

//Helpers
import { getImgStreetView } from '../../utils/helpers/googleapi';

//Services
import { BankService } from '../../utils/services/bank.service';
import { DepartmentService } from '../../utils/services/department.service';
import { EmployeeService } from '../../utils/services/employee.service';
import { PositionService } from '../../utils/services/position.service';
import { RatingService } from '../../utils/services/rating.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})

export class Dashboard implements OnInit {
	private mostRatedBank: Object = {
		name: 'Bank Name',
		address: 'Bank Address',
		officeHours: ['hh:mm', 'hh:mm'],
		fullAddress: {
			city: 'City Name',
			country: 'Country Name',
			countryCode: 'CC'
		},
		location: {
			lat: 6.8774,
			lng: 112.989
		},
		imgStreetView: getImgStreetView({lat: 6.8774, lng: 112.5})
	};

	private widgetSimple: Array<Object> = [
		{
			color: 'default',
			icon: 'fa fa-user',
			header: {
				title: 'Title',
				number: 0
			},
			body: [
				{
					title: 'Sub title',
					number: 0
				}
			]
		}
	];

	constructor(
		private bankService: BankService,
		private departmentService: DepartmentService,
		private employeeService: EmployeeService,
		private positionService: PositionService,
		private ratingService: RatingService
		){}

	ngOnInit(){
		//get most rated bank
		this.bankService.getMostRated().then((res) => {
			this.mostRatedBank = res
		});

		//set widget simple
		this.setWidgetSimple();
		
	}


	async setWidgetSimple(){

		let dataBank = await this.bankService.getTotalSummary().then((res) => {
			return [
			{
				color: 'info',
				icon: 'fa fa-bank',
				header: {
					title: 'Total Bank',
					number: res.totalBank
				},
				body: [
					{
						title: 'Low-Rated',
						number: res.totalLowRated
					},
					{
						title: 'Mid-Rated',
						number: res.totalMidRated
					},
					{
						title: 'Hi-Rated',
						number: res.totalHighRated
					}
				]
			},
			{
				color: 'success',
				icon: 'fa fa-bank',
				header: {
					title: 'Total Bank Review',
					number: res.totalRating
				},
				body: [
					{
						title: 'Avg Rating',
						number: res.avgRating
					},
					{
						title: 'Avg Favourites',
						number: res.avgFavourites
					}
				]
			}
			];
		});

		let dataContact = {
			color: 'gray',
			icon: 'fa fa-user',
			header: {
				title: 'Total Contact',
				number: await this.employeeService.customApi('/count').then(res => res.count)
			},
			body: [
				{
					title: 'Department',
					number: await this.departmentService.customApi('/count').then(res => res.count)
				},
				{
					title: 'Position',
					number: await this.positionService.customApi('/count').then(res => res.count)
				}
			]
		}

		let dataRating = {
			color: 'danger',
			icon: 'fa fa-edit',
			header: {
				title: 'Total Review',
				number: await this.ratingService.customApi('/count').then(res => res.count)
			},
			body: [
				{
					title: 'Bad',
					number: await this.ratingService.customApi('/count', {
								where: {
									and: [{ value: { gte: 0 }}, { value: { lt: 3 }}]	
								} 
							}).then(res => res.count)
				},
				{
					title: 'Neutral',
					number: await this.ratingService.customApi('/count', {
								where: {
									value: 3
								}
							}).then(res => res.count)
				},
				{
					title: 'Good',
					number: await this.ratingService.customApi('/count', {
								where: {
									and: [{value: {gt: 3}}, {value: {lte: 5}}]	
								}
							}).then(res => res.count)
				}
			]
		}


		this.widgetSimple = [...dataBank, dataRating, dataContact];
	}
}
