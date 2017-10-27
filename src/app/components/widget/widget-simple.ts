import { Component, Input } from '@angular/core';

@Component({
	selector: 'widget-simple',
	templateUrl: './widget-simple.html',
	styleUrls: ['./widget-simple.scss']
})

export class WidgetSimple{
	@Input()data: Object;

	constructor(){}
}