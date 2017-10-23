import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';

//Component
import { Employee } from './employee';

//Service
import { EmployeeService } from '../../utils/services/employee.service';

//Helpers
import { showToast } from '../../utils/helpers/dialog';

//Config
import { MODAL_TYPE } from '../../utils/config/modal';

@Component({
	selector: 'employee-list',
	templateUrl: './employee-list.component.html'
})

export class EmployeeList implements OnInit {
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

	modalActions = new EventEmitter<string | MaterializeAction>();
    

	constructor(
		private employeeService: EmployeeService,
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
					confirm: () => this.onActionDelete()
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
				actionList: {}
			}
		);

		this.openModal();
	}

	private onClickEdit(item: Employee): void{
		this.router.navigate(['contact', 'update', item.id]);
	}
}
