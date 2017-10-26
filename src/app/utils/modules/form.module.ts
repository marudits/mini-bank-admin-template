import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Autosize } from 'angular2-autosize';

@NgModule({
	imports: [
	],
	declarations: [
		Autosize
	],
	exports: [
		Autosize,
		FormsModule,
		ReactiveFormsModule
	]
	
})

export class FormModule {

}