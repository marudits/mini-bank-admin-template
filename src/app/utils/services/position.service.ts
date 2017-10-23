import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

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

	deleteData(position: Position): Promise<Position> {
		return this.http
			.delete(`${this.modelUrl}/${position.id}`)
			.toPromise()
			.then(res => position)
			.catch(this.handleError);
	}

	getList(params: Object = null): Promise<Position[]>{
		let url = params ? this.modelUrl + '?filter=' + JSON.stringify(params) : this.modelUrl;
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