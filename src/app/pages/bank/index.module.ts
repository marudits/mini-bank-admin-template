import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

//import { Autosize } from 'angular2-autosize';

//Components
import { BankList } from '../../components/bank/bank-list.component';
import { BankForm } from '../../components/bank/bank-form.component';

//Module
import { DialogModule } from '../../components/common/dialog/modal.module';
import { FormModule } from '../../utils/modules/form.module';

//Pages
import { BankPage } from './index';

//Service
import { BankService } from '../../utils/services/bank.service';

export const routes = [
  { path: '', component: BankPage, pathMatch: 'full' },
  { path: 'add', component: BankForm },
  { path: 'update/:id', component: BankForm }
];


@NgModule({
  imports: [ 
    CommonModule, 
    TextMaskModule,
    DialogModule,
    FormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
  	BankPage,
    BankList, 
  	BankForm
  ],
  providers: [
  	BankService
  ],
  exports: [RouterModule]
})
export class BankModule {
  static routes = routes;
}
