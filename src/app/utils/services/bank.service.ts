import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bank } from '../../components/bank/bank';
import { url } from '../config/app';

@Injectable()
export class BankService {
	private apiUrl: string = url.api;
	private modelUrl: string = this.apiUrl + 'Banks';
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	constructor(private http: Http){

	}

	addData(bank: Bank): Promise<Bank> {
		return this.http
			.post(this.modelUrl, bank, {headers: this.headers})
			.toPromise()
			.then(res => res.json() as Bank)
			.catch(this.handleError);
	}

	deleteData(bank: Bank): Promise<Bank> {
		return this.http
			.delete(`${this.modelUrl}/${bank.id}`)
			.toPromise()
			.then(res => bank)
			.catch(this.handleError);
	}

	getList(params: Object = null): Promise<Bank[]>{
		let url = params ? this.modelUrl + '?filter=' + JSON.stringify(params) : this.modelUrl;
		return this.http
			.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Bank[])
			.catch(this.handleError);
	}

	getDetail(id: number): Promise<Bank> {
		const params = {include: ['ratings']};
		return this.http
			.get(`${this.modelUrl}/${id}?filter=${JSON.stringify(params)}`)
			.toPromise()
			.then(res => res.json() as Bank)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any>{
		console.error('An error occured. ', error);

		return Promise.reject(error.message || error);
	}

	updateData(bank: Bank): Promise<Bank> {
		return this.http
			.patch(`${this.modelUrl}/${bank.id}`, bank, {headers: this.headers})
			.toPromise()
			.then(res => res.json() as Bank)
			.catch(this.handleError);
	}
}