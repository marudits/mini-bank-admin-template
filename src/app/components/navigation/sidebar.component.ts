import { Component } from '@angular/core';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html'
})

export class SideBar {
	private header = {
		name: 'Marudi Tri Subakti',
		email: 'marudits@gmail.com',
		background: 'https://cms-assets.tutsplus.com/uploads/users/41/posts/25951/image/material-design-background-1.jpg',
		avatar: 'https://scontent.fkul10-1.fna.fbcdn.net/v/t1.0-9/15134683_742409605898578_3239296867587327368_n.jpg?oh=0970d5ab2283ce65a1c80c78fa0ecff6&oe=5A838A59'
	};

	private menulist = [
		{type: 'menu', icon: 'account_balance', title: 'Bank', url: '/bank'},
		{type: 'menu', icon: 'insert_comment', title: 'Rating', url: '/rating'},
		{type: 'menu', icon: 'contacts', title: 'Contact', url: '/contact'},
		{type: 'menu', icon: 'info', title: 'About', url: '/about'}
	];
}