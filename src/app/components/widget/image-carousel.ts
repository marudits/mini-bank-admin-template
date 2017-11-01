import { Component, Input } from '@angular/core';

@Component({
	selector: 'image-carousel',
	templateUrl: './image-carousel.html',
	styleUrls: ['./image-carousel.scss']
})

export class ImageCarousel{
	@Input()data: Array<Object>;

	constructor(){}
}