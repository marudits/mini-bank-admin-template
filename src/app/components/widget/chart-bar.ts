import {Component, Input, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser-animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
	selector: 'chart-bar',
	templateUrl: './chart-bar.html',
	styleUrls: ['./chart-bar.scss']
})

export class ChartBar {
	@Input()single: any[];
	@Input()multi: any;
	@Input()options: any;

	// options
  	showXAxis = true;
  	showYAxis = true;
  	gradient = false;
  	showLegend = true;
  	showXAxisLabel = true;
  	//xAxisLabel = this.options.xAxisLabel;
  	showYAxisLabel = true;
  	//yAxisLabel = this.options.yAxisLabel;

  	colorScheme = {
    	domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  	};


	constructor() {
		Object.assign(this, 
			{single: this.single}, 
			{multi: this.multi}
		);
	}

	onSelect(event) {
		console.log(event);
	}
}