import { Component, DoCheck, Input } from '@angular/core';

@Component({
	selector: 'employee-detail',
	templateUrl: './employee-detail.component.html'
})

export class EmployeeDetail {
	@Input()data;
	private employeeInfo;

	private table = {
		header: ['ID', 'Name', 'Email', 'Phone', 'Ext', 'Department', 'Position'],
		column: ['id', 'name', 'email', 'phone', 'ext', 'departmentName', 'positionName']
	}

	constructor(){}

	ngDoCheck(): void {
		this.setEmployeeInfo();
	}

	setEmployeeInfo(): void {
		this.employeeInfo = Object.assign({}, this.data,
			{departmentName: this.data.department.name},
			{positionName: this.data.position.name}
		);
	}

}