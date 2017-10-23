import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';


//Component
import { Rating } from './rating';

//Config
import { MODAL_TYPE } from '../../utils/config/modal';

//Helpers
import { calculateDiffTime } from '../../utils/helpers/dateAndTime';
import { showToast } from '../../utils/helpers/dialog';

//Service
import { RatingService } from '../../utils/services/rating.service';

@Component({
	selector: 'rating-list',
	templateUrl: './rating-list.component.html'
})

export class RatingList implements OnInit {
	private listItem: Rating[];
	private selectedItem: Rating;
	private table = {
		header: ['Name', 'Bank', 'Value', 'Comment', 'Created At'],
		body: ['name', 'bankName', 'value', 'text', 'createdAt']
	}

	private modalInfo: Object = {
		info: {
			header: '',
			content: ''
		},
		type: '',
		actionList: {}
	}

	modalActions = new EventEmitter<string | MaterializeAction>();

	constructor(
		private ratingService: RatingService
		){}

	ngOnInit(): void {
		this.getList();
	}

	private getList(): void {
		let params = {include: 'bank', order: 'createdAt DESC'};
		this.ratingService.getList(params)
			.then(items => {
				let newItems = [];
				for(let item of items){
					let newItem = Object.assign(
						{}, 
						item, 
						{bankName: item.bank.name}
					);
					newItems.push(newItem);
				}
				this.listItem = newItems;
			});		
	}

	private openModal(): void {
		this.modalActions.emit({action: 'modal', params: ['open']});
	}

	private closeModal(): void {
		this.modalActions.emit({action: 'modal', params: ['close']});
	}

	private onActionDelete(): void{
		this.ratingService.deleteData(this.selectedItem)
			.then((item) => {
				showToast(`Data ${this.selectedItem.name} was successfully deleted`);
    			this.getList();
			}); 
	}

	private onClickDetail(item: Rating): void {
		console.log('onClickDetail: ', item);
		this.selectedItem = item;
		this.modalInfo = Object.assign({},
			this.modalInfo,
			{
				info: {
					header: 'Rating Detail',
					content: MODAL_TYPE.RATING_DETAIL,
					data: this.selectedItem
				}
			},
			{
				type: MODAL_TYPE.INFORMATION
			},
			{
				actionList: {}
			}
		);

		this.openModal();
	}

	private onClickDelete(item: Rating): void {
		console.log('onClickDelete: ', item);
		this.selectedItem = item;
		this.modalInfo = Object.assign({},
			this.modalInfo,
			{
				info: {
					header: 'Delete Rating',
					content: `Are you sure to delete ${this.selectedItem.name} data?`,
					data: this.selectedItem
				}
			},
			{
				type: MODAL_TYPE.CONFIRMATION
			},
			{
				actionList: {
					confirm: () => this.onActionDelete()
				}
			}
		);

		this.openModal();
	}
}
