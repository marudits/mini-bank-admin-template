import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard.component.ts';
import { Widget } from '../layout/widget/widget.directive';

import { CarouselModule } from 'ngx-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//Components
import { CardBankReview } from '../../components/widget/card-bank-review';
import { CardBankOverview } from '../../components/widget/card-bank-overview';
import { WidgetSimple } from '../../components/widget/widget-simple';
import { ImageCarousel } from '../../components/widget/image-carousel';
import { ChartBar } from '../../components/widget/chart-bar';

//Services
import { BankService } from '../../utils/services/bank.service';
import { DepartmentService } from '../../utils/services/department.service';
import { EmployeeService } from '../../utils/services/employee.service';
import { PositionService } from '../../utils/services/position.service';
import { RatingService } from '../../utils/services/rating.service';

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full' }
];


@NgModule({
  imports: [ 
  	CommonModule,
    CarouselModule,
    NgxChartsModule,
  	RouterModule.forChild(routes) 
  ],
  declarations: [ 
  	Dashboard,
  	Widget,
  	CardBankOverview,
    CardBankReview,
    WidgetSimple,
    ImageCarousel,
    ChartBar
  ],
  providers: [
    BankService,
    DepartmentService,
    EmployeeService,
    PositionService,
    RatingService
  ]
})
export class DashboardModule {
  static routes = routes;
}
