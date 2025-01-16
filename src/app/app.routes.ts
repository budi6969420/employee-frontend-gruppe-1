import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {AuthGuard} from "./guards/auth.guard";
import {SettingsViewComponent} from "./views/settings-view/settings-view.component";
import {EmployeeViewComponent} from "./views/employee-view/employee-view.component";
import {CreateEmployeeViewComponent} from "./views/create-employee-view/create-employee-view.component";
import {EditEmployeeViewComponent} from "./views/edit-employee-view/edit-employee-view.component";
import {QualificationsViewComponent} from "./views/qualifications-view/qualifications-view.component";
import {CreateQualificationViewComponent} from "./views/create-qualification-view/create-qualification-view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  {
    path: 'employees',
    component: EmployeeViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/create',
    component: CreateEmployeeViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee/edit/:id',
    component: EditEmployeeViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'qualifications',
    component: QualificationsViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'qualifications/create',
    component: CreateQualificationViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsViewComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

/*
ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    console.log(this.employeeId); // Use this to fetch the employee details
}
 */
