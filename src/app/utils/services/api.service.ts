import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as qs from 'qs';

import { url } from '../config/app';

@Injectable()
export class ApiService {
	private apiUrl:string = url.api;
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	constructor(private http: Http){} 

	call(path: string, params: any = null, method: string = 'get', headers: Headers = null): Promise<any>{
		let url = this.apiUrl + path,
			optHeaders = headers ? headers : this.headers;

		switch (method) {
			case 'get':
				url = params ? url + '?' + qs.stringify(params) : url;
				return this.http
					.get(url, {headers: optHeaders})
					.toPromise()
					.then(res => res.json())
					.catch(this.handleError)
			default:
				return this.http
					[method](url, params, {headers: optHeaders})
					.toPromise()
					.then(res => res.json())
					.catch(this.handleError)
		}
	}

	private handleError(err: any){
		console.error('An error occured.', err);

		return Promise.reject(err.message || err);
	}
}