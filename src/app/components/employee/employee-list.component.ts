import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

//Component
import { Employee } from './employee';

//Service
import { EmployeeService } from '../../utils/services/employee.service';

//Helpers
import { showToast } from '../../utils/helpers/dialog';
import { ROUTE } from '../../utils/config/routing';

//Config
import { MODAL_TYPE } from '../../utils/config/modal';

@Component({
	selector: 'employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss']
})

export class EmployeeList implements OnInit {
	private URL = ROUTE.contact;
	private listItem: Employee[];
	private showedItem: Object[];
	private table = {
		header: ['Name', 'Email', 'Phone', 'Ext', 'Department', 'Position'],
		body: ['name', 'email', 'phone', 'ext', 'departmentId', 'positionId']
	}

	private formEmployee: string = 'modal-employee-form';

	private modalInfo: Object = {
		info: {
			header: '',
			content: ''
		},
		type: '',
		actionList: {}
	}

	private selectedItem: Employee;

	constructor(
		private employeeService: EmployeeService,
		private router: Router
		){}

	ngOnInit(): void {
		this.getList();
	}

	openModal() {
        $('#modalWindow').modal('show');
    }
    
    closeModal() {
        $('#modalWindow').modal('hide');
    }

    onActionDelete(): void {
    	this.employeeService.deleteData(this.selectedItem)
    		.then((item) => {
    			showToast(`Data ${this.selectedItem.name} was successfully deleted`);
    			this.getList();
    		});
    }

    private getList(): void {
		let params = {
			include: [
				{
					relation: 'department',
					scope: {
						fields: ['name']
					}
				},
				{
					relation: 'position',
					scope: {
						fields: ['name']
					}
				}
			], 
			order: 'name ASC'
		}
		this.employeeService.getList(params)
			.then((items) => {
				this.listItem = items
			});
	}

	private onClickDelete(item: Employee): void{
		this.selectedItem = item;
		this.modalInfo = Object.assign({}, 
			this.modalInfo,
			{
				info: {
					header: 'Delete Employee',
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

	private onClickDetail(item: Employee): void{
		this.selectedItem = item;
		this.modalInfo = Object.assign({}, 
			this.modalInfo,
			{
				info: {
					header: 'Employee Detail',
					content: MODAL_TYPE.EMPLOYEE_DETAIL,
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

	private onClickEdit(item: Employee): void{
		let route = this.URL.update.split('/').splice(0);
		route.push('' + item.id);
		this.router.navigate(route);
	}
}
