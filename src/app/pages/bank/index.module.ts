import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { Autosize } from 'angular2-autosize';

//Components
import { BankList } from '../../components/bank/bank-list.component';
import { BankForm } from '../../components/bank/bank-form.component';
import { DialogModal } from '../../components/common/dialog/modal';

//Module
import { DialogModule } from '../../components/common/dialog/modal.module';

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
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    Autosize,
  	BankPage,
    BankList, 
  	BankForm
  ],
  entryComponents: [
    DialogModal
  ],
  providers: [
  	BankService
  ],
  exports: [RouterModule]
})
export class BankModule {
  static routes = routes;
}
