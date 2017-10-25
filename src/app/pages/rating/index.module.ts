import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { RatingList } from '../../components/rating/rating-list.component';
import { DialogModal } from '../../components/common/dialog/modal';

//Module
import { DialogModule } from '../../components/common/dialog/modal.module';

//Pages
import { RatingPage } from './index';

//Service
import { RatingService } from '../../utils/services/rating.service';

export const routes = [
  { path: '', component: RatingPage, pathMatch: 'full' }
];


@NgModule({
  imports: [ 
    CommonModule, 
    DialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
  	RatingPage,
    RatingList
  ],
  entryComponents: [
    DialogModal
  ],
  providers: [
  	RatingService
  ],
  exports: [RouterModule]
})
export class RatingModule {
  static routes = routes;
}
