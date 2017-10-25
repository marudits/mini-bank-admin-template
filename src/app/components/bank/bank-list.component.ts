import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

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
	templateUrl: './bank-list.component.html',
	styleUrls: ['./bank-list.component.scss']
})

export class BankList implements OnInit {
	private listItem: Bank[];
	private showedItem: Object[];
	private table = {
		header: ['Name', 'Address', 'Rating', 'Fav', 'Office Hours', 'Office Days'],
		body: ['name', 'address', 'rating', 'favourites', 'officeHoursFormatted', 'officeDaysFormatted']
	}

	private formBank: string = 'modal-bank-form';

	@ViewChild('modalWindow') private modalWindow: any;

	private modalInfo: Object = {
		info: {
			header: '',
			content: ''
		},
		type: '',
		actionList: {}
	}

	private selectedItem: Bank;
    

	constructor(
		private bankService: BankService,
		private router: Router
		){}

	ngOnInit(): void {
		this.getList();
	}

    openModal(){
    	$('#modalWindow').modal('show');
    }

    openModalDirective() {
		console.log('openModalDirective: this.modalWindow.modal: ', this.modalWindow);
    }
    
    closeModal() {
		$('#modalWindow').modal('hide');
    }

    closeModalDirective() {
		console.log('closeModalDirective: this.modalWindow.modal: ', this.modalWindow);
    }

    onActionDelete(): void {
    	this.bankService.deleteData(this.selectedItem)
    		.then((item) => {
    			this.getList();
    		});

    	this.closeModal();
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
					confirm: () => this.onActionDelete(),
					close: () => this.closeModal()
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
				actionList: {
					close: () => this.closeModal()
				}
			}
		);

		this.openModal();
	}

	private onClickEdit(item: Bank): void{
		this.router.navigate(['app', 'bank', 'update', item.id]);
	}
}
