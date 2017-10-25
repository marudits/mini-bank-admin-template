import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ModalModule } from 'ng2-bootstrap';

import { DialogModal } from './modal';

import { BankDetail } from '../../../components/bank/bank-detail.component';
import { RatingDetail } from '../../../components/rating/rating-detail.component';
import { EmployeeDetail } from '../../../components/employee/employee-detail.component';

@NgModule({
	imports: [
		CommonModule,
		ModalModule
	],
	declarations: [
		DialogModal,
		BankDetail,
		RatingDetail,
		EmployeeDetail
	],
	exports: [
		DialogModal
	]
})

export class DialogModule{}