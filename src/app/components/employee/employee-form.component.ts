import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

//Library
import 'rxjs/add/operator/switchMap';

//Component
import { Employee } from './employee';
import { Department } from '../department/department';
import { Position } from '../position/position';

//Services
import { EmployeeService } from '../../utils/services/employee.service';
import { DepartmentService } from '../../utils/services/department.service';
import { PositionService } from '../../utils/services/position.service';

//Utils
import { showToast } from '../../utils/helpers/dialog';
import { ROUTE } from '../../utils/config/routing';

@Component({
	selector: 'employee-form',
	templateUrl: './employee-form.component.html',
	styleUrls: ['./employee-form.component.scss']
})

export class EmployeeForm implements OnInit{
	private URL = ROUTE.contact;

	private employee: Employee;
	private listDepartment: Department[];
	private listPosition: Position[];
	
	form = new FormGroup({
		name: new FormControl(),
		department: new FormControl(),
		position: new FormControl(),
		email: new FormControl(),
		phone: new FormControl(),
		ext: new FormControl(),
		id: new FormControl(),
		departmentId: new FormControl(),
		positionId: new FormControl()
	});


	private validation = {
		name: {
			status: 'default',
			message: ''
		},
		departmentId: {
			status: 'default',
			message: ''
		},
		positionId: {
			status: 'default',
			message: ''
		},
		email: {
			status: 'default',
			message: ''
		},
		phone: {
			status: 'default',
			message: ''
		},
		ext: {
			status: 'default',
			message: ''
		}
	}

	constructor(
		private employeeService: EmployeeService, 
		private departmentService: DepartmentService, 
		private positionService: PositionService, 
		private router: Router,
		private activatedRouted: ActivatedRoute,
		private location: Location
		){

		let employee = {
			id: -1,
			name: '',
			email: '',
			phone: '',
			ext: '',
			departmentId: -1,
			positionId: -1,
			updatedAt: (new Date()).toString()
		}

		this.employee = employee;
	}

	ngOnInit(): void{
		if(this.router.url !== this.URL.add){
			this.activatedRouted.paramMap
				.switchMap((params: ParamMap) => this.employeeService.getDetail(+params.get('id')))
				.subscribe(employee => {
					this.employee = employee;
					this.form.patchValue(employee);
					this.onChangeHandler('department', employee.departmentId);
				});	
		}
		
		//set list of department
		this.departmentService.getList()
			.then((items) => this.listDepartment = items)
			.catch(this.handleError);

		//set list of position
		this.positionService.getList()
			.then((items) => this.listPosition = items)
			.catch(this.handleError);

		
	}

	private goBack(): void {
		this.location.back();
	}

	private handleError(err: any): void{
		console.error(err);
	}

	private validateForm(): Boolean {

		let {name, email, phone, ext, department, departmentId, position, positionId} = this.form.value;

		//RegExp pattern for validation
		const PATTERN = {
            email: /^[\w.-]+@[\w.-]+?\.[a-zA-Z]{2,7}(\.[a-zA-Z]{2,7})*$/g,
            phone: /^(0|60|\+60)(\d|\s){5,}$/g,
            ext: /^\+?\d{4}$/
        };

		//validate name
		if(!name || name.trim() === ''){
			//showToast(`Name shouldn't be empty`);
			this.validation.name.status = 'error';
			this.validation.name.message = `Name shouldn't be empty`;
			return false;
		} else {
			this.validation.name.status = 'success';
			this.validation.name.message = '';
		}

		//validate email
		if(!email || !email.match(PATTERN.email)){
			//showToast(`Wrong format for email address`);
			this.validation.email.status = 'error';
			this.validation.email.message = `Wrong format for email address`;
			return false;
		} else {
			this.validation.email.status = 'success';
			this.validation.email.message = '';
		}		

		//validate phone
		if(!phone || !phone.match(PATTERN.phone)){
			//showToast(`Wrong format for phone number`);
			this.validation.phone.status = 'error';
			this.validation.phone.message = `Wrong format for phone number`;
			return false;
		} else {
			this.validation.phone.status = 'success';
			this.validation.phone.message = '';
		}

		//validate ext
		if(!ext || !ext.match(PATTERN.ext)){
			//showToast(`Wrong format for ext number`);
			this.validation.ext.status = 'error';
			this.validation.ext.message = `Wrong format for ext number`;
			return false;
		} else {
			this.validation.ext.status = 'success';
			this.validation.ext.message = '';
		}

		//validate departmentId
		let selectedDepartment = null;
		if(!department || department === -1){
			this.validation.departmentId.status = 'error';
			this.validation.departmentId.message = `Please select Department`;
			return false;
		} else {
			let dep = typeof department === 'object' ? department.name : department;
			selectedDepartment = this.listDepartment.find((x) => x.name === dep);
			
			if(!selectedDepartment){
				this.validation.departmentId.status = 'error';
				this.validation.departmentId.message = `Please select Department`;
				return false;
			} else {
				console.log('selectedDepartment: ', selectedDepartment, '| departmentId: ', departmentId);
				this.validation.departmentId.status = 'success';
				this.validation.departmentId.message = '';	
			}
			
		}

		//validate positionId
		let selectedPosition = null;
		if(!position || position === -1){
			this.validation.positionId.status = 'error';
			this.validation.positionId.message = `Please select Position`;
			//showToast(`Please select Position`);
			return false;
		} else {
			let pos = typeof position === 'object' ? position.name : position;
			selectedPosition = this.listPosition.find((x) => x.name === pos);

			if(!selectedPosition || selectedPosition.departmentId !== selectedDepartment.id){
				this.validation.positionId.status = 'error';
				this.validation.positionId.message = `Select the correct Position`;
				return false;
			} else {
				this.validation.positionId.status = 'success';
				this.validation.positionId.message = '';
			}
		}
		

		this.employee = Object.assign({}, this.form.value, {departmentId: selectedDepartment.id}, {positionId: selectedPosition.id});
		
		return true;
	}


	private onChangeHandler(type: string, e: any){
		switch (type) {
			case "department":
				if(this.listDepartment){
					let depName = e.name || e,
						dep = this.listDepartment.find((x) => x.name === depName);
					
					if(dep && dep.id){
						let params = {
							where: {
								departmentId: dep.id
							}
						}
						
						//set list of position
						this.positionService.getList(params)
							.then((items) => this.listPosition = items)
							.catch(this.handleError);

						this.employee.positionId = -1;
					}
				}
				break;
			case "position":
				break;
			default:
				// code...
				break;
		}
	}

	private submitForm(): void {
		if(this.validateForm()){
			let that = this,
				formData = this.employee;

			//add data
			if(!formData.id || formData.id === -1){
				delete formData.id;
				delete formData.updatedAt;

				this.employeeService.addData(formData)
					.then((item) => {
						that.router.navigate(this.URL.index.split('/').splice(1));
						})
					.catch(this.handleError);

			//update data
			} else if (!isNaN(formData.id)) {
				formData.updatedAt = (new Date()).toString();

				this.employeeService.updateData(formData)
					.then((item) => {
						that.router.navigate(this.URL.index.split('/').splice(1));
						})
					.catch(this.handleError);
			}
		}

	}

}