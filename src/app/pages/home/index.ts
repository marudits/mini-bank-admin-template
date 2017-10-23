import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'page-home',
	templateUrl: './index.html'
})
export class HomePage {
	private title: string = 'Welcome to Admin Page';

	constructor(private router: Router){}
}