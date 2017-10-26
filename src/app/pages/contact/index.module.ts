import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { EmployeeList } from '../../components/employee/employee-list.component';
import { EmployeeForm } from '../../components/employee/employee-form.component';
import { DialogModal } from '../../components/common/dialog/modal';

//Module
import { DialogModule } from '../../components/common/dialog/modal.module';
import { FormModule } from '../../utils/modules/form.module';

//Pages
import { ContactPage } from './index';

//Service
import { EmployeeService } from '../../utils/services/employee.service';
import { DepartmentService } from '../../utils/services/department.service';
import { PositionService } from '../../utils/services/position.service';

export const routes = [
  { path: '', component: ContactPage, pathMatch: 'full' },
  { path: 'add', component: EmployeeForm },
  { path: 'update/:id', component: EmployeeForm }
];


@NgModule({
  imports: [ 
    CommonModule,
    FormModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
  	ContactPage,
    EmployeeForm,
    EmployeeList
  ],
  providers: [
  	EmployeeService,
    DepartmentService,
    PositionService
  ],
  exports: [RouterModule]
})
export class ContactModule {
  static routes = routes;
}
