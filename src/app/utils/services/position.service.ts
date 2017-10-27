import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as qs from 'qs'

import { Position } from '../../components/position/position';
import { url } from '../config/app';

@Injectable()
export class PositionService {
	private apiUrl: string = url.api;
	private modelUrl: string = this.apiUrl + 'Positions';
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	constructor(private http: Http){

	}

	customApi(path: string, params: Object = null, method: string = 'get'): Promise<any>{
		let url = params ? this.modelUrl + path + '?' + qs.stringify(params) : this.modelUrl + path;
		return this.http[method](url)
			.toPromise()
			.then(res => res.json())
			.catch(this.handleError)
	}

	deleteData(position: Position): Promise<Position> {
		return this.http
			.delete(`${this.modelUrl}/${position.id}`)
			.toPromise()
			.then(res => position)
			.catch(this.handleError);
	}

	getList(params: Object = null): Promise<Position[]>{
		let url = params ? this.modelUrl + '?filter=' + qs.stringify(params) : this.modelUrl;
		return this.http.get(url, {headers: this.headers})
			.toPromise()
			.then(response => response.json() as Position[])
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any>{
		console.error('An error occured. ', error);

		return Promise.reject(error.message || error);
	}
}