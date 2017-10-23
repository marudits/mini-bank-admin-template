import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

//Component
import { Bank } from './bank';

//Service
import { BankService } from '../../utils/services/bank.service';

//Helpers
import { showToast } from '../../utils/helpers/dialog';

//Config
import { MODAL_TYPE } from '../../utils/config/modal';

@Component({
	selector: 'bank-list',
	templateUrl: './bank-list.component.html'
})

export class BankList implements OnInit {
	private listItem: Bank[];
	private showedItem: Object[];
	private table = {
		header: ['Name', 'Address', 'Rating', 'Favourites', 'Office Hours', 'Office Days'],
		body: ['name', 'address', 'rating', 'favourites', 'officeHours', 'officeDays']
	}

	private formBank: string = 'modal-bank-form';

	private modalInfo: Object = {
		info: {
			header: '',
			content: ''
		},
		type: '',
		actionList: {}
	}

	private selectedItem: Bank;

	modalActions = new EventEmitter<string | MaterializeAction>();
    

	constructor(
		private bankService: BankService,
		private router: Router
		){}

	ngOnInit(): void {
		this.getList();
	}

	openModal() {
        this.modalActions.emit({ action: "modal", params: ['open'] });
    }
    
    closeModal() {
        this.modalActions.emit({ action: "modal", params: ['close'] });
    }

    onActionDelete(): void {
    	this.bankService.deleteData(this.selectedItem)
    		.then((item) => {
    			showToast(`Data ${this.selectedItem.name} was successfully deleted`);
    			this.getList();
    		});
    }

    private getList(): void {
		let params = {order: 'id DESC'}
		this.bankService.getList(params)
			.then((items) => {
				this.listItem = items
			});
	}

	private onClickDelete(item: Bank): void{
		this.selectedItem = item;
		this.modalInfo = Object.assign({}, 
			this.modalInfo,
			{
				info: {
					header: 'Delete Bank',
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

	private onClickDetail(item: Bank): void{
		this.selectedItem = item;
		this.modalInfo = Object.assign({}, 
			this.modalInfo,
			{
				info: {
					header: 'Bank Detail',
					content: MODAL_TYPE.BANK_DETAIL,
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

	private onClickEdit(item: Bank): void{
		this.router.navigate(['bank', 'update', item.id]);
	}
}
