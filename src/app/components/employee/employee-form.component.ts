import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

//Library
import * as $ from 'jquery';
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

@Component({
	selector: 'employee-form',
	templateUrl: './employee-form.component.html'
})

export class EmployeeForm implements OnInit{
	private CONFIG = {
		URL: {
			add: '/contact/add'
		}
	};

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
	})

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
		if(this.router.url !== this.CONFIG.URL.add){
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

		let {name, email, phone, ext, departmentId, positionId} = this.form.value;

		//RegExp pattern for validation
		const PATTERN = {
            email: /^[\w.-]+@[\w.-]+?\.[a-zA-Z]{2,7}(\.[a-zA-Z]{2,7})*$/g,
            phone: /^(0|60|\+60)(\d|\s){5,}$/g,
            ext: /^\+?\d{4}$/
        };

		//validate name
		if(!name || name.trim() === ''){
			showToast(`Name shouldn't be empty`);
			return false;
		}

		//validate email
		if(!email || !email.match(PATTERN.email)){
			showToast(`Wrong format for email address`);
			return false;
		}		

		//validate phone
		if(!phone || !phone.match(PATTERN.phone)){
			showToast(`Wrong format for phone number`);
			return false;
		}

		//validate ext
		if(!ext || !ext.match(PATTERN.ext)){
			showToast(`Wrong format for ext number`);
			return false;
		}

		//validate departmentId
		let selectedDepartment = null;
		if(!this.form.value.department){
			showToast(`Please select Department`);
			return false;
		} else {
			let department = typeof this.form.value.department === 'object' ? this.form.value.department.name : this.form.value.department;
			selectedDepartment = this.listDepartment.find((x) => x.name === department);
			
			if(!selectedDepartment){
				showToast(`Choose the correct Department`);
				return false;
			}	
		}

		//validate positionId
		let selectedPosition = null;
		if(!this.form.value.position){
			showToast(`Please select Position`);
			return false;
		} else {
			let position = typeof this.form.value.position === 'object' ? this.form.value.position.name : this.form.value.position;
			selectedPosition = this.listPosition.find((x) => x.name === position);
			
			if(!selectedPosition || selectedPosition.departmentId !== selectedDepartment.id){
				showToast(`Select the correct Position`);
				return false;
			}	
		}
		

		this.employee = Object.assign({}, this.form.value, {name: name}, {email: email}, {phone: phone}, {ext: ext}, {departmentId: selectedDepartment.id}, {positionId: selectedPosition.id});

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
						that.router.navigate(['/contact']);
						})
					.catch(this.handleError);

			//update data
			} else if (!isNaN(formData.id)) {
				formData.updatedAt = (new Date()).toString();

				this.employeeService.updateData(formData)
					.then((item) => {
						that.router.navigate(['/contact']);
						})
					.catch(this.handleError);
			}
		}

	}

}