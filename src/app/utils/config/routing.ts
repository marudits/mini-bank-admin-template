import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { BankPage } from '../../pages/bank/index';
import { BankForm } from '../../components/bank/bank-form.component';
import { HomePage } from '../../pages/home/index';
import { RatingPage } from '../../pages/rating/index'; 
import { ContactPage } from '../../pages/contact/index';
import { EmployeeForm } from '../../components/employee/employee-form.component'; 

const routes: Routes = [
	{ path: '', component: HomePage },
	{ path: 'bank', component: BankPage },
	{ path: 'bank/add', component: BankForm },
	{ path: 'bank/update/:id', component: BankForm},
	{ path: 'rating', component: RatingPage },
	{ path: 'contact', component: ContactPage },
	{ path: 'contact/add', component: EmployeeForm },
	{ path: 'contact/update/:id', component: EmployeeForm }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}