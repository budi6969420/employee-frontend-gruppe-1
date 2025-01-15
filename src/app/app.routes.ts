import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginViewComponent} from "./views/login-view/login-view.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {SettingsViewComponent} from "./views/settings-view/settings-view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginViewComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/create',
    component: EmployeeListComponent, // Use the appropriate component for creating an employee
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/edit/:id', // Use `:id` to denote a dynamic parameter
    component: EmployeeListComponent, // Use the appropriate component for editing an employee
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
