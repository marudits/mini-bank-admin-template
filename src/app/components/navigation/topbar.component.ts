import { Component } from '@angular/core';

@Component({
	selector: 'topbar',
	templateUrl: './topbar.component.html'
})

export class TopBar {
	private logo =  {
		text: 'MiniBank-Adm'
	};

	private menulist = [
		{title: 'Bank', url: '/bank'},
		{title: 'Rating', url: '/rating'},
		{title: 'About', url: '/about'}
	];

}