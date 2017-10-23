import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from '../../components/employee/employee';
import { url } from '../config/app';

@Injectable()
export class EmployeeService {
	private apiUrl: string = url.api;
	private modelUrl: string = this.apiUrl + 'Employees';
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	constructor(private http: Http){

	}

	addData(employee: Employee): Promise<Employee> {
		return this.http
			.post(this.modelUrl, employee, {headers: this.headers})
			.toPromise()
			.then(res => res.json() as Employee)
			.catch(this.handleError);
	}

	deleteData(employee: Employee): Promise<Employee> {
		return this.http
			.delete(`${this.modelUrl}/${employee.id}`)
			.toPromise()
			.then(res => employee)
			.catch(this.handleError);
	}

	getDetail(id: number): Promise<Employee> {
		const params = {include: ['department', 'position']};
		return this.http
			.get(`${this.modelUrl}/${id}?filter=${JSON.stringify(params)}`)
			.toPromise()
			.then(res => res.json() as Employee)
			.catch(this.handleError);
	}

	getList(params: Object = null): Promise<Employee[]>{
		let url = params ? this.modelUrl + '?filter=' + JSON.stringify(params) : this.modelUrl;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Employee[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any>{
		console.error('An error occured. ', error);

		return Promise.reject(error.message || error);
	}

	updateData(employee: Employee): Promise<Employee> {
		return this.http
			.patch(`${this.modelUrl}/${employee.id}`, employee, {headers: this.headers})
			.toPromise()
			.then(res => res.json() as Employee)
			.catch(this.handleError);
	}
}