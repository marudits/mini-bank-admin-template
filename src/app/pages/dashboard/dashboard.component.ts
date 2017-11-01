import { Component, OnInit } from '@angular/core';

//Helpers
import { getImgStreetView } from '../../utils/helpers/googleapi';

//Library
import * as moment from 'moment';

//Services
import { BankService } from '../../utils/services/bank.service';
import { DepartmentService } from '../../utils/services/department.service';
import { EmployeeService } from '../../utils/services/employee.service';
import { PositionService } from '../../utils/services/position.service';
import { RatingService } from '../../utils/services/rating.service';
import { ApiService } from '../../utils/services/api.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.scss']
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

	private latestReview: Array<Object> = [
		{
			img: {
				src: '',
				alt: ''
			},
			caption: {
				title: 'Name',
				content: 'Lorem ipsum dolor sit amet',
				notes: `1m ago at Bank Name`
			}
		}
	]

	private chartBar = {
		single: [],
		multi: [],
		options: {
			xAxisLabel: 'Label',
			yAxisLabel: 'Label',
		}
	}

	constructor(
		private bankService: BankService,
		private departmentService: DepartmentService,
		private employeeService: EmployeeService,
		private positionService: PositionService,
		private ratingService: RatingService,
		private apiService: ApiService
		){}

	ngOnInit(){
		//get most rated bank
		this.bankService.getMostRated().then((res) => {
			this.mostRatedBank = res
		});

		//set widget simple
		this.setWidgetSimple();

		//set review carousel
		this.setImageCarousel();

		//set chart bar
		this.setChartBar();
	}

	async setChartBar(){
		let prevTwoMonth = moment().subtract(2, 'month'),
			prevMonth = moment().subtract(1, 'month'),
			currentMonth = moment();

		const BANK_ACTIONS_MOBILE = [4, 5, 6, 7]

		let params = {
			prevTwoMonth: {
				filterReference: {id: {inq: BANK_ACTIONS_MOBILE}},
				month: new Date(prevTwoMonth)
			},
			prevMonth: {
				filterReference: {id: {inq: BANK_ACTIONS_MOBILE}},
				month: new Date(prevMonth)
			},
			currentMonth: {
				filterReference: {id: {inq: BANK_ACTIONS_MOBILE}},
				month: new Date(currentMonth)
			}
		}


		let data = await [
			{
				legends: prevTwoMonth.format('MMM YYYY'),
				data: await this.apiService.call('UserActions/monthlyTotalSummary', params.prevTwoMonth)
								.then(res => res.result.data)
			},
			{
				legends: prevMonth.format('MMM YYYY'),
				data: await this.apiService.call('UserActions/monthlyTotalSummary', params.prevMonth)
								.then(res => res.result.data)
			},
			{
				legends: currentMonth.format('MMM YYYY'),
				data: await this.apiService.call('UserActions/monthlyTotalSummary', params.currentMonth)
								.then(res => res.result.data)
			}
		]

		let chartData = [];

		data.forEach((monthlyData) => {
			//console.log('monthlyData: ', monthlyData);
			let monthlyChart = {
				name: monthlyData.legends,
				series: []
			};

			monthlyData.data.forEach((x) => {
				monthlyChart.series.push({name: x.name, value: x.total});
			});

			chartData.push(monthlyChart);
		});

		let multi = chartData;


		this.chartBar = {
			multi: multi, 
			options: {
				xAxisLabel: 'Bank Actions',
				yAxisLabel: 'Total Hit'
			}
		}

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
					title: 'Total Rating Bank',
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

	setImageCarousel(){
		this.ratingService.customApi('/latestReview').then(res => {
			let {data} = res.result,
				items = [];
						
			data.forEach((item) => {
				items.push({
					img: {
						src: item.bank.imgStreetView,
						alt: item.bank.name
					},
					caption: {
						title: item.name,
						content: item.text,
						notes: `${item.time} at ${item.bank.name}`
					}
				});
			});

			this.latestReview = items;
		});
	}
}
